import React from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import { Todo } from "../components/Todo";
import { AddTodo } from "../components/AddTodo";

export const MainScreen = (props) => {
  const { removeTodo, todos, addTodo, selectTodo } = props;

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {todos.length ? (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={todos}
          renderItem={({ item }) => (
            <Todo todo={item} onRemove={removeTodo} selectTodo={selectTodo} />
          )}
        />
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
});
