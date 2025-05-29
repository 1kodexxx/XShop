import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import { Stack, router, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import InputField from "@/components/InputField";
import SocialLoginButtons from "@/components/SocialLoginButtons";
import { SafeAreaView } from "react-native-safe-area-context";

const SignInScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: "Sign In",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} color={Colors.black} />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Login to Your Account</Text>

        <InputField
          placeholder="Email Address"
          placeholderTextColor={Colors.gray}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <InputField
          placeholder="Password"
          placeholderTextColor={Colors.gray}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            router.dismissAll();
            router.push("/(tabs)");
          }}>
          <Text style={styles.btnTxt}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.loginTxt}>
          Don't have an account?{" "}
          <Link href={"/signup"} asChild>
            <Text style={styles.loginTxtSpan}>SignUp</Text>
          </Link>
        </Text>

        <View style={styles.divider} />
        <SocialLoginButtons emailHref={"/signin"} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 1.2,
    color: Colors.black,
    marginBottom: 50,
  },
  btn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignSelf: "stretch",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  btnTxt: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  loginTxt: {
    marginBottom: 30,
    fontSize: 14,
    color: Colors.black,
    lineHeight: 24,
  },
  loginTxtSpan: {
    color: Colors.primary,
    fontWeight: "600",
  },
  divider: {
    borderTopColor: Colors.gray,
    borderTopWidth: StyleSheet.hairlineWidth,
    width: "30%",
    marginBottom: 30,
  },
});
