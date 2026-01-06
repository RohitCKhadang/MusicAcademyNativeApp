import { Box, Text } from "native-base";

export default function StudentDashboard() {
  return (
    <Box p={6}>
      <Text fontSize="lg" bold>Hello Rahul 👋</Text>
      <Text mt={4}>Monthly Fee: ₹2000</Text>
      <Text color="red.500">Status: Unpaid</Text>
    </Box>
  );
}
