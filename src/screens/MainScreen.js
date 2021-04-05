import React, { useState, useEffect, useContext, useCallback } from "react";
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";
import { Todo } from "../components/Todo";
import { AddTodo } from "../components/AddTodo";
import { THEME } from "./theme";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";
import { Loader } from "../components/ui/Loader";
import { AppText } from "../components/ui/AppText";
import { AppButton } from "../components/ui/AppButton";

const getWidth = () => {
  return Dimensions.get("window").width - THEME.PADDING_HORIGONTAL * 2;
};

export const MainScreen = () => {
  const { removeTodo, todos, addTodo, fetchTodos, loading, error } = useContext(
    TodoContext
  );
  const { changeScreen } = useContext(ScreenContext);
  const [deviceWidth, setDeviceWidth] = useState(getWidth());
  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const update = () => setDeviceWidth(getWidth());
    Dimensions.addEventListener("change", update);

    return () => {
      return Dimensions.removeEventListener("change", update);
    };
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onPress={loadTodos}>Reload</AppButton>
      </View>
    );
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {todos.length ? (
        <View style={{ width: deviceWidth }}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={todos}
            renderItem={({ item }) => (
              <Todo
                todo={item}
                onRemove={removeTodo}
                selectTodo={changeScreen}
              />
            )}
          />
        </View>
      ) : (
        <View style={styles.imgWrap}>
          {/* <Image
            source={require("../../assets/noimage.png")}
            style={styles.image}
          /> */}
          <Image
            source={{
              uri: "https://turkexpert.net/theme/images/no-results.png",
            }}
            style={styles.image}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 300,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 20,
    paddingVertical: 10,
  },
});
