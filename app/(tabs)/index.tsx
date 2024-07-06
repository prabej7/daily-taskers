import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Stack, Tabs, useRouter } from "expo-router";
import { TaskProvider } from "@/Context/TaskProvider";
import { useEffect } from "react";

export default function TabOneScreen() {
  const router = useRouter();

  useEffect(() => {
    console.log("ok");
    setTimeout(() => {
      router.push("/tasks");
    }, 1000);
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs.Screen options={{ tabBarStyle: { display: "none" } }} />
      <View style={styles.container}>
        <Text style={styles.title}>Daily Tasker</Text>
        <Text>"Ultimate way to grow."</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
