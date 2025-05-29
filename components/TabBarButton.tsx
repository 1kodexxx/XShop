import {
  View,
  Text,
  Pressable,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import React from "react";
import { icon } from "@/constants/Icons";
import { Colors } from "@/constants/Colors";

type RouteName = keyof typeof icon;

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  onLongPress: (event: GestureResponderEvent) => void;
  isFocused: boolean;
  label: string;
  routeName: RouteName;
};

const TabBarButton = (props: Props) => {
  const { onPress, onLongPress, isFocused, routeName, label } = props;
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarBtn}>
      <View style={styles.iconWrapper}>
        {icon[routeName]({
          color: isFocused ? Colors.primary : Colors.black,
        })}

        {routeName === "cart" && (
          <View style={styles.badgeWrapper}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        )}
      </View>
      <Text
        style={[
          styles.label,
          { color: isFocused ? Colors.primary : Colors.black },
        ]}>
        {label}
      </Text>
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  tabbarBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  iconWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeWrapper: {
    position: "absolute",
    top: -6,
    right: -10,
    backgroundColor: Colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    zIndex: 10,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  label: {
    fontSize: 12,
  },
});
