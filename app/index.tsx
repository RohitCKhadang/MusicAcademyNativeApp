import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { loginApi } from "../services/service";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((s) => s.login);

  const loginauth = async () => {
    // Prevent multiple button presses while loading
    if (loading) return;

    const postData = {
      emailId: loginId,
      password: password,
    };
    setLoading(true);
    try {
      const response: any = await loginApi(postData);
      alert("Login Successful");
      router.replace("/admin/dashboard");
      return response.data;
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    } finally {
      setLoading(false);
    }
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

      <Button
        mode="contained"
        onPress={loginauth}
        disabled={loading}
        buttonColor={loading ? "#cccccc" : "#007bff"}
        textColor={loading ? "#666666" : "#ffffff"}
        style={{ opacity: loading ? 0.6 : 1 }}
      >
        {loading ? "Logging in..." : "Login"}
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
