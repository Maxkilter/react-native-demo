import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { THEME } from "../screens/theme";
import { AppText } from "./ui/AppText";

export const Navbar = ({ title }) => {
  return (
    <View
      style={{
        ...styles.navbar,
        ...Platform.select({
          ios: styles.navbarIos,
          android: styles.navbarAndroid,
        }),
      }}
    >
      <AppText style={styles.text}>{title}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  text: {
    color:
      Platform.OS === "android"
        ? THEME.TEXT_BUTTON_COLOR
        : THEME.BACKGROUND_COLOR,
    fontSize: 20,
    fontFamily: "roboto-bold",
  },
  navbarAndroid: {
    backgroundColor: THEME.BACKGROUND_COLOR,
  },
  navbarIos: {
    borderBottomWidth: 1,
  },
});
