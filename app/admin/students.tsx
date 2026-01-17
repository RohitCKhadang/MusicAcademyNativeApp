import { fetchUsersApi } from "@/services/service";
import { useFocusEffect, useRouter } from "expo-router";
import { Box, HStack, Spinner, Text, VStack } from "native-base";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

export default function Students() {
  const router = useRouter();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const showUser = async () => {
    setLoading(true);
    try {
      let response = await fetchUsersApi();
      setUserData(response.data?.data || []);
      return response.data;
    } catch (error) {
      console.error(error);
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      showUser();
    }, []),
  );

  const handleDelete = (userId: string) => {
    alert("Delete user: ");
    // Add delete API call here
  };

  const handleEdit = (userId: string) => {
    // router.push(`/admin/userForm?id=${userId}`);
  };

  return (
    <Box flex={1} bg="white">
      {/* Header with Add Button */}
      <HStack
        bg="white"
        px={4}
        py={2}
        justifyContent="flex-end"
        alignItems="center"
        borderBottomWidth={1}
        borderBottomColor="#f0f0f0"
      >
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/admin/userForm")}
        >
          <Text style={styles.addButtonText}>+ Add User</Text>
        </TouchableOpacity>
      </HStack>

      {/* Loading State */}
      {loading ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Spinner size="lg" color="blue.600" />
          <Text mt={4} color="gray.600">
            Loading students...
          </Text>
        </Box>
      ) : userData.length === 0 ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text fontSize="md" color="gray.600">
            No students found
          </Text>
        </Box>
      ) : (
        <FlatList
          data={userData}
          keyExtractor={(item: any) => item._id || Math.random().toString()}
          renderItem={({ item }) => (
            <Box style={styles.cardContainer}>
              <VStack space={3} bg="#f8f9fa" p={4} borderRadius="lg" shadow={2}>
                {/* User Info with Action Icons */}
                <HStack justifyContent="space-between" alignItems="flex-start">
                  <VStack space={2} flex={1}>
                    <HStack space={2}>
                      <Text fontSize="sm" color="gray.600" fontWeight="500">
                        Name:
                      </Text>
                      <Text fontSize="md" fontWeight="bold" flex={1}>
                        {item.firstName} {item.lastName}
                      </Text>
                    </HStack>
                    <HStack space={2}>
                      <Text fontSize="sm" color="gray.600" fontWeight="500">
                        Email:
                      </Text>
                      <Text fontSize="sm" flex={1} color="blue.600">
                        {item.emailId}
                      </Text>
                    </HStack>
                    <HStack space={2}>
                      <Text fontSize="sm" color="gray.600" fontWeight="500">
                        Mobile:
                      </Text>
                      <Text fontSize="sm" flex={1}>
                        {item.mobileNo}
                      </Text>
                    </HStack>
                    {item.courseId && item.courseId.courseName && (
                      <HStack space={2}>
                        <Text fontSize="sm" color="gray.600" fontWeight="500">
                          Course:
                        </Text>
                        <Text
                          fontSize="sm"
                          flex={1}
                          bg="blue.100"
                          color="blue.800"
                          px={2}
                          py={1}
                          borderRadius="md"
                        >
                          {item.courseId.courseName}
                        </Text>
                      </HStack>
                    )}
                  </VStack>

                  {/* Action Icons - Right Side */}
                  <HStack space={3} ml={4}>
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={() => handleEdit(item._id)}
                    >
                      <Text style={styles.editIcon}>✏️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={() => handleDelete(item._id)}
                    >
                      <Text style={styles.deleteIcon}>🗑️</Text>
                    </TouchableOpacity>
                  </HStack>
                </HStack>
              </VStack>
            </Box>
          )}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  cardContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  iconButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  editIcon: {
    fontSize: 20,
  },
  deleteIcon: {
    fontSize: 20,
  },
  listContent: {
    paddingVertical: 8,
  },
});
