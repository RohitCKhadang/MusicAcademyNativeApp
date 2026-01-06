import { Ionicons } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import { IconButton } from "native-base";
import { useAuthStore } from "../../store/authStore";

export default function AdminLayout() {
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
        name="students"
        options={{
          title: "Students",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="fees"
        options={{
          title: "Fees",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cash" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="reports"
        options={{
          title: "Reports",
          tabBarIcon: ({ color }) => (
            <Ionicons name="bar-chart" size={20} color={color} />
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
