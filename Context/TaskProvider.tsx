import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { setItem, removeItem, getItem } from "@/utils/AsyncStorage";

// Define the props for the provider
interface Props {
  children: ReactNode;
}

// Define the Task interface
export interface Task {
  task: string;
  isCompleted: boolean;
  time: string;
}

// Define the context's shape
interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  handleComplete: (id: number) => void;
  deleteCompleteTasks: () => void;
}

// Create the context with a default value
export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

// Define the TaskProvider component
export const TaskProvider: React.FC<Props> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      const storedTasks = await getItem("tasks");
      if (storedTasks) {
        setTasks(storedTasks);
      }
    })();
  }, []);

  // Sync tasks to AsyncStorage whenever they change
  useEffect(() => {
    (async () => {
      await setItem("tasks", tasks);
    })();
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleComplete = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, id) =>
        id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteCompleteTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.isCompleted));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        handleComplete,
        deleteCompleteTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
