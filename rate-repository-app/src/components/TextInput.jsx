import React from "react";
import { TextInput as NativeTextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    borderRadius: 5,
    padding: 10,
    borderColor: "#d9d9d9",
    borderStyle: "solid",
    borderWidth: 1,
  },
  error: {
    borderColor: "#d73a4a",
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, error && styles.error, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
