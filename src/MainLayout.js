import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Navbar } from "./components/Navbar";
import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import { THEME } from "./screens/theme";
import { ScreenContext } from "./context/screen/screenContext";

export const MainLayout = () => {
  // const [selectedTodo, setSelectedTodo] = useState(null);
  const { todo } = useContext(ScreenContext);

  //   const [todos, setTodos] = useState([]);

  //   const addTodo = (title) => {
  //     const newTodo = {
  //       id: Date.now().toString(),
  //       title,
  //     };
  //     setTodos([...todos, newTodo]);
  //   };

  //   const removeTodo = (id) => {
  //     let todoToRemove = null;
  //     const filteredTodos = todos.filter((todo) => {
  //       if (todo.id === id) todoToRemove = todo;
  //       return todo.id !== id;
  //     });

  //     Alert.alert(
  //       "Removing todo",
  //       `Are you sure that you want to remove "${todoToRemove?.title}" todo?`,
  //       [
  //         {
  //           text: "Cancel",
  //           style: "cancel",
  //         },
  //         {
  //           text: "Remove",
  //           style: "positive",
  //           onPress: () => setTodos(filteredTodos),
  //         },
  //       ],
  //       { cancelable: false }
  //     );
  //   };

  //   const updateTodo = (id, title) => {
  //     const updatedTodos = todos.map((todo) => {
  //       if (todo.id === id) todo.title = title;
  //       return todo;
  //     });
  //     setTodos(updatedTodos);
  //   };

  return (
    <View>
      <Navbar title="Medallia" />
      <View style={styles.container}>
        {todo?.id ? <TodoScreen /> : <MainScreen />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: THEME.PADDING_HORIGONTAL,
  },
});
