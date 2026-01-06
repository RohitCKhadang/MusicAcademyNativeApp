import { Ionicons } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import { IconButton } from "native-base";
import { useAuthStore } from "../../store/authStore";

export default function StudentLayout() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <IconButton
            icon={<Ionicons name="log-out-outline" size={22} />}
            onPress={() => {
              logout();
              router.replace("/");
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="my-fees"
        options={{
          title: "My Fees",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cash-outline" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <Ionicons name="time-outline" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
