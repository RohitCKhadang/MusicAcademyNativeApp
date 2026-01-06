import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Icon, Pressable, Text, VStack } from "native-base";

export default function AdminDashboard() {
  return (
    <Box flex={1} bg="coolGray.100" px={4} pt={6}>
      
      {/* Header */}
      <VStack mb={6}>
        <Text fontSize="xl" fontWeight="bold">
          🎵 Music Academy
        </Text>
        <Text color="coolGray.600">Good Morning, Admin 👋</Text>
      </VStack>

      {/* Stats Cards */}
      <HStack space={4} mb={4}>
        <StatCard
          title="Total Students"
          value="120"
          icon="people"
        />
        <StatCard
          title="Fees Collected"
          value="₹45,000"
          icon="cash"
        />
      </HStack>

      <HStack space={4} mb={6}>
        <StatCard
          title="Pending Payments"
          value="18"
          icon="alert-circle"
          color="red.500"
        />
        <StatCard
          title="Fee Window"
          value="1–10 Sep"
          icon="calendar"
          color="green.600"
        />
      </HStack>

      {/* Quick Actions */}
      <Box bg="white" borderRadius="xl" p={4} shadow={2}>
        <Text fontSize="md" fontWeight="bold" mb={3}>
          Quick Actions
        </Text>

        <ActionButton label="Add Student" icon="person-add" />
        <ActionButton label="View Fees" icon="wallet" />
        <ActionButton label="Reports" icon="bar-chart" />
      </Box>
    </Box>
  );
}

/* Reusable Components */

const StatCard = ({ title, value, icon, color }: any) => (
  <Box
    flex={1}
    bg="white"
    p={4}
    borderRadius="xl"
    shadow={2}
  >
    <HStack justifyContent="space-between" alignItems="center">
      <VStack>
        <Text color="coolGray.500">{title}</Text>
        <Text fontSize="lg" fontWeight="bold">
          {value}
        </Text>
      </VStack>
      <Icon
        as={Ionicons}
        name={icon}
        size="lg"
        color={color || "primary.500"}
      />
    </HStack>
  </Box>
);

const ActionButton = ({ label, icon }: any) => (
  <Pressable mb={3}>
    <HStack
      bg="coolGray.100"
      p={3}
      borderRadius="lg"
      alignItems="center"
    >
      <Icon as={Ionicons} name={icon} size="md" mr={3} />
      <Text fontWeight="medium">{label}</Text>
    </HStack>
  </Pressable>
);
