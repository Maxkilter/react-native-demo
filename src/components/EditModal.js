import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, StyleSheet, TextInput, Modal, Alert } from "react-native";
import { THEME } from "../screens/theme";
import { AppButton } from "./ui/AppButton";

export const EditModal = ({ isVisible, closeModal, value, onSave }) => {
  const [title, setTitle] = useState(value);

  const saveHandler = () => {
    const titleSize = title.trim().length;

    if (titleSize < 3) {
      Alert.alert(
        "Error!",
        `Title should contain at least 3 symbols. Now it has ${titleSize} symbols.`
      );
    } else {
      onSave(title);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={false}>
      <View style={styles.wrap}>
        <TextInput
          style={styles.input}
          placeholder="Enter new todo"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={60}
          value={title}
          onChangeText={setTitle}
        />
        <View style={styles.buttons}>
          <AppButton color={THEME.CANCEL_BUTTON_COLOR} onPress={closeModal}>
            <FontAwesome name="arrow-left" />
          </AppButton>
          <AppButton color={THEME.SAVE_BUTTON_COLOR} onPress={saveHandler}>
            <FontAwesome name="check" />
          </AppButton>
          {/* <Button
            title="Cancel"
            color={THEME.CANCEL_BUTTON_COLOR}
            onPress={closeModal}
          /> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.INPUT_BOTTOM_BORDER_COLOR,
    borderBottomWidth: 2,
    width: "80%",
    fontFamily: "roboto-bold",
    fontSize: 22,
  },
  buttons: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
