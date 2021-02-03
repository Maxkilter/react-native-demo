import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { EditModal } from "../components/EditModal";
import { AppCard } from "../components/ui/AppCard";
import { AppTextBold } from "../components/ui/AppTextBold";
import { AppButton } from "../components/ui/AppButton";
import { FontAwesome } from "@expo/vector-icons";
import { THEME } from "./theme";

export const TodoScreen = ({ goBack, todo, removeTodo, onSave }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRemoveTodo = () => {
    removeTodo(todo.id);
    goBack(null);
  };

  const modalToggle = () => setIsModalVisible(!isModalVisible);

  const saveHandler = (title) => {
    onSave(todo.id, title);
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
          <AppButton onPress={() => goBack(null)}>
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
            style={styles.removeBtn}
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
