import { TextInput, StyleSheet, Pressable } from "react-native";
import { View, Text } from "./Themed";
import { useState } from "react";

interface Props {
  onChangeText?: (text: string) => void;
  onClick?: () => void;
  value?: string;
}

const Add: React.FC<Props> = ({ onChangeText, onClick, value }) => {
  const [isFocused, setFocused] = useState<boolean>(false);

  return (
    <>
      <View style={{ marginTop: 6 }}>
        <TextInput
          placeholder="Add Tasks"
          style={[styles.input, { borderBottomWidth: isFocused ? 1 : 0.5 }]}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChangeText={onChangeText}
          value={value}
        />
        <Pressable style={[styles.button]} onPress={onClick}>
          <Text style={styles.text}>Add</Text>
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
    backgroundColor: "black",
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
