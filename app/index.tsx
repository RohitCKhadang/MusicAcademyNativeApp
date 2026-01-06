import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { loginApi } from "../services/authService";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const login = useAuthStore((s) => s.login);

  const handleLogin = async () => {
    const res = await loginApi(loginId, password);

    if (!res.success || !res.token || !res.role || !res.userId) {
      alert("Invalid credentials");
      return;
    }

    login(res.token, res.role, res.userId);

    router.replace(
  res.role === "admin"
    ? "/admin/dashboard"
    : "/student/dashboard"
);

     
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        🎵 Shadja Music School
      </Text>

      <TextInput
        label="Login ID"
        value={loginId}
        onChangeText={setLoginId}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />

      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
});
