import React from "react";
import { View, StyleSheet } from "react-native";
import { THEME } from "../../screens/theme";

export const AppCard = ({ children, style }) => {
  return <View style={{ ...styles.default, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  default: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // shadows
    shadowColor: "#000",
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    backgroundColor: "#fff",
    borderRadius: 10,
    // without this property shadows on Android doesn't work
    elevation: 8,
  },
});
