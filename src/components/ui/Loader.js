import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { THEME } from "../../screens/theme";

export const Loader = () => (
  <View style={styles.loaderWrapper}>
    <ActivityIndicator size="large" color={THEME.BACKGROUND_COLOR} />
  </View>
);

const styles = StyleSheet.create({
  loaderWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
