import { Alert, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Stack, Tabs } from "expo-router";
import Add from "@/components/Add";
import { useState } from "react";
import { Task, useTaskContext } from "@/Context/TaskProvider";
import AllTasks from "@/components/AllTasks";
import getCurrentTime from "@/utils/time";
export default function TabTwoScreen() {
  const { tasks, addTask } = useTaskContext();
  const [task, setTask] = useState<string>("");
  const handleChange = (text: string) => {
    setTask(text);
  };
  const handleSubmit = () => {
    if (task.length > 0) {
      const data: Task = {
        task: task,
        isCompleted: false,
        time: getCurrentTime(),
      };
      addTask(data);
    } else {
      Alert.alert("Error", 'The field "Add task" is empty!');
    }

    setTask("");
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs.Screen options={{ tabBarStyle: { display: "none" } }} />
      <View style={styles.container}>
        <Text style={styles.heading}>Add Task:</Text>
        <Add onChangeText={handleChange} value={task} onClick={handleSubmit} />
        <AllTasks />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 48,
    height: "100%",
  },
  heading: {
    fontSize: 24,
  },
});
