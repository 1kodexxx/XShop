import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

type Props = {};

const Header = (props: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top + 10 }]}>
      <View style={styles.container}>
        <Text style={styles.logo}>SX</Text>
        <Link href={"/explore"} asChild>
          <TouchableOpacity style={styles.searchBar}>
            <Text style={styles.searchTxt}>Search</Text>
            <Ionicons name="search-outline" size={20} color={Colors.gray} />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
    marginRight: 12,
  },
  searchBar: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchTxt: {
    color: Colors.gray,
    fontSize: 16,
  },
});
