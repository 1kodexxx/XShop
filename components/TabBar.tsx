import { View, Platform, StyleSheet, LayoutChangeEvent } from "react-native";
import { useTheme } from "@react-navigation/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarButton from "./TabBarButton";
import { Colors } from "@/constants/Colors";
import { icon } from "@/constants/Icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useState } from "react";

// Получаем допустимые ключи из icon
type RouteName = keyof typeof icon;

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
  const buttonWidth = dimensions.width / state.routes.length;

  const tabPositionX = useSharedValue(0);

  useEffect(() => {
    tabPositionX.value = withTiming(buttonWidth * state.index, {
      duration: 200,
    });
  }, [state.index, buttonWidth]);

  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View onLayout={onTabBarLayout} style={styles.tabbar}>
      <Animated.View
        style={[
          {
            position: "absolute",
            backgroundColor: Colors.primary,
            top: 0,
            left: 20,
            height: 2,
            width: buttonWidth / 2,
          },
          animatedStyle,
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : typeof options.title === "string"
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        // Проверка, что route.name — это ключ из icon
        if (!(route.name in icon)) return null;

        return (
          <TabBarButton
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name as RouteName}
            label={typeof label === "string" ? label : ""}
          />
        );
      })}
    </View>
  );
}

export default TabBar;

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: "row",
    paddingTop: 16,
    paddingBottom: 40,
    backgroundColor: Colors.white,
  },
});
