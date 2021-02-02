import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { THEME } from "../../screens/theme";
import { AppTextBold } from "./AppTextBold";

export const AppButton = ({
  children,
  onPress,
  color = THEME.CANCEL_BUTTON_COLOR,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={{ ...styles.button, backgroundColor: color }}>
        <AppTextBold style={styles.text}>{children}</AppTextBold>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: THEME.TEXT_BUTTON_COLOR,
  },
});
