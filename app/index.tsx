import { StyleSheet, Text, View } from "react-native";
import React from "react";

const index = () => {
  return (
    <View style={styles.backround}>
      <Text>index</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  backround: {
    backgroundColor: "red",
  },
});
