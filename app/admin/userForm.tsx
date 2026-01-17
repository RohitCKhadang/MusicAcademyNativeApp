import { courseDropdownApi, signupApi } from "@/services/service";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useFormik } from "formik";
import { NativeBaseProvider, Radio } from "native-base";
import { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SignupFormValues, signupValidationSchema } from "./module";

export default function UserForm() {
  const [courseDropdown, setCourseDropdown] = useState<any>([]);
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

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    formik;
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate: any) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setFieldValue("dob", formattedDate);
    }
    setShowDatePicker(false);
  };

  const singnUp = async (values: SignupFormValues) => {
    setLoading(true);
    try {
      let response = await signupApi(values);
      alert("Signup Successful");
      router.replace("/admin/dashboard");
      return response.data;
    } catch (error) {
      console.error(error);
      alert("Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  const fillCourseDropdown = async () => {
    try {
      let response = await courseDropdownApi();
      let courseData =
        Array.isArray(response.data?.data) && response.data?.data.length > 0
          ? response.data?.data.map((course: any) => ({
              label: course.courseName,
              value: course._id,
            }))
          : [];

      setCourseDropdown(courseData);
      return response.data;
    } catch (error) {
      console.error(error);
      alert("dropdown Failed");
    } finally {
    }
  };

  useFocusEffect(
    useCallback(() => {
      fillCourseDropdown();
    }, []),
  );

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Signup</Text>

      <NativeBaseProvider>
        <View style={styles.roleContainer}>
          <Text style={styles.roleLabel}>Select Role:</Text>
          <Radio.Group
            value={values.role || "admin"}
            onChange={(v) => setFieldValue("role", v)}
            flexDirection="row"
            name="roleGroup"
          >
            <Radio value="admin">Admin</Radio>
            <Radio value="student" style={{ marginLeft: 10 }}>
              Student
            </Radio>
          </Radio.Group>
        </View>
      </NativeBaseProvider>

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

        <View style={styles.col2}>
          <Text>DOB</Text>
          <TouchableOpacity
            style={styles.datePickerContainer}
            onPress={() => setShowDatePicker(true)}
          >
            <TextInput
              style={styles.datePickerInput}
              value={
                values.dob ? new Date(values.dob).toLocaleDateString() : ""
              }
              editable={false}
              placeholder="MM/DD/YYYY"
            />
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>
          {touched.dob && errors.dob && (
            <Text style={styles.error}>{errors.dob}</Text>
          )}
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={values.dob ? new Date(values.dob) : new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Input
          label="Age"
          value={String(values.age)}
          keyboardType="numeric"
          onChangeText={handleChange("age")}
          error={touched.age && errors.age}
          containerStyle={[styles.col2, { marginTop: 10 }]}
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
      <View style={styles.fullWidth}>
        <Text>Gender</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={values.gender}
            onValueChange={(itemValue: any) =>
              setFieldValue("gender", itemValue)
            }
            style={styles.picker}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
        {touched.gender && errors.gender && (
          <Text style={styles.error}>{errors.gender}</Text>
        )}
      </View>
      {/* CONDITIONAL STUDENT FIELDS */}
      {values.role === "student" && (
        <View style={styles.grid}>
          <View style={styles.col2}>
            <Text>Course ID</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={values.courseId}
                onValueChange={(itemValue: any) =>
                  setFieldValue("courseId", itemValue)
                }
                style={styles.picker}
              >
                <Picker.Item label="Select Course" value="" />
                {Array.isArray(courseDropdown) && courseDropdown.length > 0
                  ? courseDropdown.map((course: any) => (
                      <Picker.Item
                        key={course.value}
                        label={course.label}
                        value={course.value}
                      />
                    ))
                  : null}
              </Picker>
            </View>
            {touched.courseId && errors.courseId && (
              <Text style={styles.error}>{errors.courseId}</Text>
            )}
          </View>

          <Input
            label="Course Fees"
            value={String(values.courseFees)}
            keyboardType="numeric"
            onChangeText={handleChange("courseFees")}
            error={touched.courseFees && errors.courseFees}
            containerStyle={[styles.col2, { marginTop: 10 }]}
          />
        </View>
      )}
      {/* SUBMIT */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
          <Text style={styles.btnText}>
            {loading ? "Please Wait..." : "Register"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.resetBtn}
          onPress={() => formik.resetForm()}
        >
          <Text style={styles.resetBtnText}>Reset</Text>
        </TouchableOpacity>
      </View>
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
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 24 },
  roleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 6,
  },
  roleLabel: {
    marginRight: 16,
    fontWeight: "600",
    fontSize: 16,
  },
  /* 🔥 GRID */ grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  col2: { width: "48%", marginBottom: 20 },
  fullWidth: { width: "100%", marginBottom: 20 },
  inputWrap: { marginBottom: 0 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    fontSize: 15,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingRight: 10,
    marginTop: 8,
    backgroundColor: "#fff",
  },
  datePickerInput: {
    flex: 1,
    padding: 12,
    fontSize: 15,
  },
  calendarIcon: {
    fontSize: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginTop: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
  },
  error: { color: "#dc3545", fontSize: 12, marginTop: 6, fontWeight: "500" },
  btn: {
    backgroundColor: "#007bff",
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    flex: 1,
    marginRight: 10,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10,
  },
  resetBtn: {
    backgroundColor: "#6c757d",
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    flex: 1,
    marginLeft: 10,
  },
  resetBtnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
