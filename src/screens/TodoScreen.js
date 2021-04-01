import React, { useState, useContext } from "react";
import { StyleSheet, View, Dimensions, Alert } from "react-native";
import { EditModal } from "../components/EditModal";
import { AppCard } from "../components/ui/AppCard";
import { AppTextBold } from "../components/ui/AppTextBold";
import { AppButton } from "../components/ui/AppButton";
import { FontAwesome } from "@expo/vector-icons";
import { THEME } from "./theme";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";

export const TodoScreen = () => {
  const { updateTodo, removeTodo } = useContext(TodoContext);
  const { todo, changeScreen } = useContext(ScreenContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRemoveTodo = () => {
    Alert.alert(
      "Removing todo",
      `Are you sure that you want to remove "${todo?.title}" todo?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "positive",
          onPress: () => {
            removeTodo(todo.id);
            changeScreen(null);
          },
        },
      ]
    );
  };

  const modalToggle = () => setIsModalVisible(!isModalVisible);

  const saveHandler = (title) => {
    updateTodo(todo.id, title);
    modalToggle();
  };

  return (
    <View>
      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <View>
          <AppButton onPress={modalToggle} color={THEME.EDIT_BUTTON_COLOR}>
            <FontAwesome name="edit" size={20} />
          </AppButton>
        </View>
      </AppCard>
      <View style={styles.btnsBox}>
        <View style={styles.button}>
          <AppButton onPress={changeScreen}>
            <FontAwesome
              name="arrow-circle-left"
              size={20}
              color={THEME.TEXT_BUTTON_COLOR}
            />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            onPress={handleRemoveTodo}
            color={THEME.REMOVE_BUTTON_COLOR}
          >
            <FontAwesome name="remove" size={20} />
          </AppButton>
          {/* <Button
            title="Remove"
            color={THEME.REMOVE_BUTTON_COLOR}
            style={styles.removeBtn}
            onPress={handleRemoveTodo}
          /> */}
        </View>
      </View>
      <EditModal
        isVisible={isModalVisible}
        closeModal={modalToggle}
        value={todo.title}
        onSave={saveHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    // width: Dimensions.get("window").width / 3.5,
    width: Dimensions.get("window").width > 400 ? 150 : 100,
  },
  title: {
    fontSize: 20,
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
});
