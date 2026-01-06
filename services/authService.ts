type LoginResponse = {
  success: boolean;
  role?: "admin" | "student";
  token?: string;
  userId?: number;
  message?: string;
};

export const loginApi = async (
  loginId: string,
  password: string
): Promise<LoginResponse> => {

  // simulate network delay (real app feeling)
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (loginId === "admin" && password === "1") {
    return {
      success: true,
      role: "admin",
      token: "mock-admin-token",
      userId: 1,
    };
  }

  if (loginId === "student" && password === "1") {
    return {
      success: true,
      role: "student",
      token: "mock-student-token",
      userId: 101,
    };
  }

  return {
    success: false,
    message: "Invalid login credentials",
  };
};
