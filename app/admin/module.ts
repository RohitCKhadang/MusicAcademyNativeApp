import * as Yup from "yup";

export type UserRole = "student" | "admin" ;

export interface SignupFormValues {
  firstName: string;
  lastName: string;
  address: string;
  emailId: string;
  mobileNo: string;
  password: string;
  dob: string;       // ISO date string (yyyy-mm-dd)
  age: number | "";  // allow empty before submit
  role: UserRole;
  gender: string;
  courseId?: string;
  courseFees?: number | "";
}



export const signupValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),

  lastName: Yup.string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),

  address: Yup.string()
    .trim()
    .required("Address is required"),

  emailId: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  mobileNo: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
    .required("Mobile number is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[@$!%*?&#]/, "Password must contain at least one special character")
    .required("Password is required"),

  dob: Yup.string()
    .required("Date of birth is required"),

  age: Yup.number()
    .typeError("Age must be a number")
    .min(1, "Invalid age")
    .required("Age is required"),

  role: Yup.string()
    .oneOf(["student", "admin", "teacher"], "Invalid role")
    .required("Role is required"),

  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Invalid gender")
    .required("Gender is required"),

  // 🔥 CONDITIONAL VALIDATION
  courseId: Yup.string().when("role", {
    is: "student",
    then: (schema) => schema.required("Course is required"),
    otherwise: (schema) => schema.notRequired()
  }),

  courseFees: Yup.number().when("role", {
    is: "student",
    then: (schema) =>
      schema
        .typeError("Course fees must be a number")
        .positive("Course fees must be greater than 0")
        .required("Course fees are required"),
    otherwise: (schema) => schema.notRequired()
  })
});
