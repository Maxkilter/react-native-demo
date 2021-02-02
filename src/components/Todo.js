import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { THEME } from "../screens/theme";
import { AppText } from "./ui/AppText";

export const Todo = ({ todo, onRemove, selectTodo }) => {
  const longPressHandler = () => onRemove(todo.id);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onLongPress={longPressHandler}
      onPress={() => selectTodo(todo)}
    >
      <View style={styles.todo}>
        <AppText style={styles.todoText}>{todo.title}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: THEME.BORDER_COLOR,
    borderRadius: 5,
    marginBottom: 10,
  },
  todoText: {
    fontSize: 18,
  },
});
