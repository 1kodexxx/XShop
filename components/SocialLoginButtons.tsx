import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Link, Href } from "expo-router";
import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Google from "@/assets/images/google-logo.svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeIn,
  FadeInRight,
  FadeInDown,
} from "react-native-reanimated";

type Props = {
  emailHref: Href<string | object>;
};

const SocialLoginButtons = (props: Props) => {
  const { emailHref } = props;
  return (
    <View style={styles.socialLoginWrapper}>
      <Animated.View entering={FadeInDown.delay(300).duration(500)}>
        <Link href={"/signin"} asChild>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="mail-outline" size={20} color={Colors.black} />
            <Text style={styles.btnTxt}>Continue with Email</Text>
          </TouchableOpacity>
        </Link>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(700).duration(500)}>
        <TouchableOpacity style={styles.button}>
          <Google width={20} height={20} />
          <Text style={styles.btnTxt}>Continue with Google</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(1100).duration(500)}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="logo-apple" size={20} color={Colors.black} />
          <Text style={styles.btnTxt}>Continue with Apple</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SocialLoginButtons;

const styles = StyleSheet.create({
  socialLoginWrapper: {
    alignSelf: "stretch",
  },
  button: {
    flexDirection: "row",
    padding: 10,
    borderColor: Colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginBottom: 15,
  },
  btnTxt: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.black,
  },
  loginTxt: {
    marginTop: 30,
    fontSize: 14,
    color: Colors.black,
    lineHeight: 24,
  },
  loginTxtSpan: {
    color: Colors.primary,
    fontWeight: 600,
  },
});
