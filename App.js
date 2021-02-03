import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Navbar } from "./src/components/Navbar";
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from "./src/screens/TodoScreen";
import { THEME } from "./src/screens/theme";

const draftTodo = {
  id: 2,
  title: "Tada-rada",
};

const loadApplication = async () => {
  return await Font.loadAsync({
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
};

export default function App() {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [todos, setTodos] = useState([]);
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={(err) => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now().toString(),
      title,
    };
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id) => {
    let todoToRemove = null;
    const filteredTodos = todos.filter((todo) => {
      if (todo.id === id) todoToRemove = todo;
      return todo.id !== id;
    });

    Alert.alert(
      "Removing todo",
      `Are you sure that you want to remove "${todoToRemove?.title}" todo?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "positive",
          onPress: () => setTodos(filteredTodos),
        },
      ],
      { cancelable: false }
    );
  };

  const updateTodo = (id, title) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) todo.title = title;
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <View>
      <Navbar title="Medallia" />
      <View style={styles.container}>
        {!selectedTodo?.id ? (
          <MainScreen
            addTodo={addTodo}
            removeTodo={removeTodo}
            todos={todos}
            selectTodo={setSelectedTodo}
          />
        ) : (
          <TodoScreen
            goBack={setSelectedTodo}
            todo={selectedTodo}
            removeTodo={removeTodo}
            onSave={updateTodo}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: THEME.PADDING_HORIGONTAL,
  },
});
