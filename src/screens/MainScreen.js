import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Todo } from "../components/Todo";
import { AddTodo } from "../components/AddTodo";

export const MainScreen = (props) => {
  const { removeTodo, todos, addTodo } = props;

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={todos}
        renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
