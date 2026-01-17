// import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Box, Button, Text } from "native-base";
import { FlatList } from "react-native";
 

export default function Students() {
  // const navigation = useNavigation();
   const router = useRouter();

  const students = [
    { id: 1, name: "Rahul", course: "Guitar" },
    { id: 2, name: "Anita", course: "Piano" },
  ];

  return (
    <Box flex={1} p={4}>

      {/* 🔹 ADD USER BUTTON */}
      <Button
        mb={4}
         onPress={() => router.push("/admin/userForm")}
      >
        Add User
      </Button>

      {/* 🔹 YOUR EXISTING LIST */}
      <FlatList
        data={students}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <Box bg="white" p={4} mb={3} borderRadius="lg">
            <Text bold>{item.name}</Text>
            <Text>{item.course}</Text>
          </Box>
        )}
      />
    </Box>
  );
}
