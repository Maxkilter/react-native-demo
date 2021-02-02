import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { EditModal } from "../components/EditModal";
import { AppCard } from "../components/ui/AppCard";
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
        <Text style={styles.title}>{todo.title}</Text>
        <View>
          <Button
            title="Edit"
            color={THEME.EDIT_BUTTON_COLOR}
            style={styles.removeBtn}
            onPress={modalToggle}
          />
        </View>
      </AppCard>
      <View style={styles.btnsBox}>
        <View style={styles.button}>
          <Button title="Back" onPress={() => goBack(null)} />
        </View>
        <View style={styles.button}>
          <Button
            title="Remove"
            color={THEME.REMOVE_BUTTON_COLOR}
            style={styles.removeBtn}
            onPress={handleRemoveTodo}
          />
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
    width: "45%",
  },
  title: {
    fontSize: 20,
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
});
