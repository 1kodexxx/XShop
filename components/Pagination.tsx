import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

type Props = {
  items: string[];
  paginationIndex: number;
};

const Pagination = ({ items, paginationIndex }: Props) => {
  return (
    <View style={styles.container}>
      {items.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDots,
            {
              backgroundColor:
                paginationIndex === index ? Colors.primary : "#ccc",
            },
          ]}
        />
      ))}

      <View style={styles.paginationNumberContainer}>
        <View style={styles.paginationNumberBox}>
          <Text style={styles.paginationText}>
            {paginationIndex + 1}/{items.length}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDots: {
    width: 30,
    height: 4,
    margin: 3,
    borderRadius: 5,
    backgroundColor: "#ccc",
  },
  paginationNumberContainer: {
    position: "absolute",
    alignItems: "flex-end",
    width: "100%",
    paddingRight: 20,
  },
  paginationNumberBox: {
    backgroundColor: Colors.extraLigthGray,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  paginationText: {
    color: Colors.primary,
    fontSize: 13,
  },
});
