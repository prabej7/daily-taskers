import { Redirect, Stack, Tabs } from "expo-router";
export default function TabOneScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs.Screen options={{ tabBarStyle: { display: "none" } }} />
      <Redirect href="/tasks" />
    </>
  );
}
