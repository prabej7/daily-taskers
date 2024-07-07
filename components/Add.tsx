import { TextInput, StyleSheet, Pressable } from "react-native";
import { View, Text } from "./Themed";
import { useState } from "react";
import useTheme from "@/hooks/useTheme";

interface Props {
  onChangeText?: (text: string) => void;
  onClick?: () => void;
  value?: string;
}

const Add: React.FC<Props> = ({ onChangeText, onClick, value }) => {
  const [isFocused, setFocused] = useState<boolean>(false);
  const theme = useTheme();
  return (
    <>
      <View style={{ marginTop: 6 }}>
        <TextInput
          placeholder="Add Tasks"
          style={[
            styles.input,
            {
              borderBottomWidth: isFocused ? 1 : 0.5,
              borderColor: theme.text,
              color: theme.text,
            },
          ]}
          placeholderTextColor={theme.text}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChangeText={onChangeText}
          value={value}
        />
        <Pressable
          style={[styles.button, { backgroundColor: theme.inputbg }]}
          onPress={onClick}
        >
          <Text style={[styles.text, { color: theme.inputText }]}>Add</Text>
        </Pressable>
      </View>
    </>
  );
};

export default Add;

const styles = StyleSheet.create({
  input: {
    borderBottomColor: "black",
  },
  button: {
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
