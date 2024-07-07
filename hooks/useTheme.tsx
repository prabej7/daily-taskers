import { useColorScheme } from "react-native";
import { dark, light } from "@/constants/ThemeColor";

const useTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? dark : light;
};

export default useTheme;
