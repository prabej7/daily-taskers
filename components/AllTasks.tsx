import { useTaskContext } from "@/Context/TaskProvider";
import { View, Text } from "./Themed";
import { StyleSheet, ScrollView } from "react-native";
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";

const AllTasks = () => {
  const { tasks, handleComplete } = useTaskContext();

  const handleCheck = (id: number) => {
    handleComplete(id);
  };

  return (
    <>
      <ScrollView
        style={styles.main}
        contentContainerStyle={{ justifyContent: "center", gap: 12 }}
      >
        {tasks.length > 0 ? (
          <Text style={{ fontSize: 18 }}>Your Tasks :</Text>
        ) : (
          <Text
            style={{
              color: "#00000069",
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
              <View style={styles.task}>
                <View style={{ backgroundColor: "#eeeeee" }}>
                  <Text
                    style={[
                      styles.title,
                      {
                        color: task.isCompleted ? "#00000069" : "black",
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
                  color={"black"}
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
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  time: {
    fontWeight: "100",
  },
});
