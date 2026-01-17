import { signupApi } from "@/services/service";
import { router } from "expo-router";
import { useFormik } from "formik";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SignupFormValues, signupValidationSchema } from "./module";

export default function UserForm() {
  const formik = useFormik<SignupFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      emailId: "",
      mobileNo: "",
      password: "",
      dob: "",
      age: "",
      role: "admin",
      gender: "",
      courseId: "",
      courseFees: "",
    },

    validationSchema: signupValidationSchema,

    onSubmit: (values) => {
      const payload = { ...values };
singnUp(values);
      // if (values.role !== "student") {
      //   delete payload.courseId;
      //   delete payload.courseFees;
      // }

      console.log("User Form Data:", payload);
    },
  });

  const { values, errors, touched, handleChange, handleSubmit } = formik;
const [loading, setLoading] = useState(false);
const singnUp = async(values:SignupFormValues) => {
  setLoading(true);
try {
  let response = await signupApi(values);
  alert("Signup Successful");
   router.replace("/admin/dashboard");
  return response.data;
} catch (error) {
  console.error(error);
  alert("Signup Failed");
}finally {  
setLoading(false);
}}


  return (
    <  ScrollView
 style={styles.container}
   keyboardShouldPersistTaps="handled"
  showsVerticalScrollIndicator={false}
 >
      <Text style={styles.title}>Signup</Text>

      {/* GRID */}
      <View style={styles.grid}>
        <Input
          label="First Name"
          value={values.firstName}
          onChangeText={handleChange("firstName")}
          error={touched.firstName && errors.firstName}
          containerStyle={styles.col2}
        />

        <Input
          label="Last Name"
          value={values.lastName}
          onChangeText={handleChange("lastName")}
          error={touched.lastName && errors.lastName}
          containerStyle={styles.col2}
        />

        <Input
          label="Email"
          value={values.emailId}
          onChangeText={handleChange("emailId")}
          error={touched.emailId && errors.emailId}
          containerStyle={styles.col2}
        />

        <Input
          label="Mobile"
          value={values.mobileNo}
          onChangeText={handleChange("mobileNo")}
          error={touched.mobileNo && errors.mobileNo}
          containerStyle={styles.col2}
        />

        <Input
          label="DOB"
          value={values.dob}
          onChangeText={handleChange("dob")}
          error={touched.dob && errors.dob}
          containerStyle={styles.col2}
        />

        <Input
          label="Age"
          value={String(values.age)}
          keyboardType="numeric"
          onChangeText={handleChange("age")}
          error={touched.age && errors.age}
          containerStyle={styles.col2}
        />
      </View>

      {/* FULL WIDTH */}
      <Input
        label="Address"
        value={values.address}
        onChangeText={handleChange("address")}
        error={touched.address && errors.address}
        containerStyle={styles.fullWidth}
      />

      <Input
        label="Password"
        value={values.password}
        secureTextEntry
        onChangeText={handleChange("password")}
        error={touched.password && errors.password}
        containerStyle={styles.fullWidth}
      />

      <Input
        label="Gender"
        value={values.gender}
        onChangeText={handleChange("gender")}
        error={touched.gender && errors.gender}
        containerStyle={styles.fullWidth}
      />

      <Input
        label="Role (student/admin/teacher)"
        value={values.role}
        onChangeText={handleChange("role")}
        error={touched.role && errors.role}
        containerStyle={styles.fullWidth}
      />

      {/* CONDITIONAL STUDENT FIELDS */}
      {values.role === "student" && (
        <View style={styles.grid}>
          <Input
            label="Course ID"
            value={values.courseId}
            onChangeText={handleChange("courseId")}
            error={touched.courseId && errors.courseId}
            containerStyle={styles.col2}
          />

          <Input
            label="Course Fees"
            value={String(values.courseFees)}
            keyboardType="numeric"
            onChangeText={handleChange("courseFees")}
            error={touched.courseFees && errors.courseFees}
            containerStyle={styles.col2}
          />
        </View>
      )}

      {/* SUBMIT */}
      <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
        <Text style={styles.btnText}>{loading?'Please Wait...':'Register'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const Input = ({ label, error, containerStyle, ...props }: any) => (
  <View style={[styles.inputWrap, containerStyle]}>
    <Text>{label}</Text>
    <TextInput style={styles.input} {...props} />
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: { paddingVertical: 5,paddingHorizontal: 20, backgroundColor: "#fff", flex: 1 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  /* 🔥 GRID */ grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  col2: { width: "48%", marginBottom: 12 },
  fullWidth: { width: "100%", marginBottom: 12 },
  inputWrap: { marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 6 },
  error: { color: "red", fontSize: 12, marginTop: 4 },
  btn: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 6,
    marginTop: 20,
  },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});
