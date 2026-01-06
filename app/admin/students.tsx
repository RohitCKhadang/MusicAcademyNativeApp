import { Box, Text } from "native-base";
import { FlatList } from "react-native";

export default function Students() {
  const students = [
    { id: 1, name: "Rahul", course: "Guitar" },
    { id: 2, name: "Anita", course: "Piano" },
  ];

  return (
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
  );
}
