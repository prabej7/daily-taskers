import { useTaskContext } from "@/Context/TaskProvider";
import { View, Text } from "./Themed";
import { StyleSheet, ScrollView } from "react-native";
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useTheme from "@/hooks/useTheme";

interface DeleteProps {
  onPress?: () => void;
}

const AllTasks = () => {
  const theme = useTheme();
  const { tasks, handleComplete, deleteCompleteTasks } = useTaskContext();
  const [isMenuClicked, setMenuClicked] = useState<boolean>(false);
  const handleCheck = (id: number) => {
    handleComplete(id);
  };

  const Delete: React.FC<DeleteProps> = ({ onPress }) => {
    return (
      <>
        <View style={styles.deletebutton}>
          <Text style={[styles.deleteText]} onPress={onPress}>
            Delete
          </Text>
        </View>
      </>
    );
  };

  const handleMenuClick = () => {
    setMenuClicked(!isMenuClicked);
  };

  const handleDelete = () => {
    deleteCompleteTasks();
    setMenuClicked(false);
  };

  return (
    <>
      {isMenuClicked && <Delete onPress={handleDelete} />}
      <ScrollView
        style={styles.main}
        contentContainerStyle={{ justifyContent: "center", gap: 12 }}
      >
        {tasks.length > 0 ? (
          <View style={styles.menu}>
            <Text style={{ fontSize: 18 }}>Your Tasks :</Text>
            <FontAwesome
              name="list"
              style={[styles.icon, { color: theme.inputbg }]}
              onPress={handleMenuClick}
            />
          </View>
        ) : (
          <Text
            style={{
              color: theme.text,
              textAlign: "center",
              marginTop: "50%",
            }}
          >
            Your tasks will appear here.
          </Text>
        )}

        {tasks.map((task, index) => {
          return (
            <React.Fragment key={index}>
              <View style={[styles.task, { backgroundColor: theme.cardbg }]}>
                <View style={{ backgroundColor: theme.cardbg }}>
                  <Text
                    style={[
                      styles.title,
                      {
                        color: task.isCompleted
                          ? theme.opacityDown
                          : theme.text,
                        textDecorationLine: task.isCompleted
                          ? "line-through"
                          : "none",
                      },
                    ]}
                  >
                    {task.task}
                  </Text>
                  <Text style={styles.time}>{task.time}</Text>
                </View>

                <Checkbox
                  onValueChange={() => handleCheck(index)}
                  value={task.isCompleted}
                  color={task.isCompleted ? "#2ac256" : undefined}
                  style={{ borderRadius: 50 }}
                />
              </View>
            </React.Fragment>
          );
        })}
      </ScrollView>
    </>
  );
};

export default AllTasks;

const styles = StyleSheet.create({
  task: {
    backgroundColor: "#eeeeee",
    minHeight: 75,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    paddingLeft: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 24,
  },
  main: {
    display: "flex",
    gap: 12,
    marginTop: 24,
    position: "relative",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  time: {
    fontWeight: "100",
  },
  menu: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 6,
  },
  icon: {
    fontSize: 18,
    fontWeight: "normal",
  },
  deletebutton: {
    backgroundColor: "#f3f3f3",
    padding: 12,
    position: "absolute",
    zIndex: 1,
    right: 50,
    top: 210,
    borderRadius: 5, // Optional, adds a rounded corner effect
    ...Platform.select({
      ios: {
        shadowColor: "#000", // Black shadow color
        shadowOffset: { width: 0, height: 2 }, // Horizontal and vertical offset
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3.84, // Shadow blur radius
      },
      android: {
        elevation: 5, // Shadow depth on Android
      },
    }),
    marginTop: 6,
  },
  deleteText: {
    color: "crimson",
    fontWeight: "normal",
  },
});
