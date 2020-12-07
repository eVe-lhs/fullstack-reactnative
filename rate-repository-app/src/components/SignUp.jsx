import React from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import * as Yup from "yup";

import theme from "../../theme";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
  },
  itemsContainer: { width: "90%", alignItems: "stretch" },
  items: { height: 50, marginVertical: 8 },
  signUpButton: {
    textAlign: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    color: "white",
    padding: 10,
    fontWeight: "bold",
  },
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemsContainer}>
        <FormikTextInput
          name="username"
          placeholder="Username"
          testID="username"
          style={styles.items}
        />
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry
          testID="password"
          style={styles.items}
        />
        <FormikTextInput
          name="confirmpassword"
          placeholder="Password Confirmation"
          secureTextEntry
          testID="confirmpassword"
          style={styles.items}
        />
        <TouchableWithoutFeedback onPress={onSubmit} testID="submitButton">
          <Text style={styles.signUpButton}>Sign Up</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Field required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Field required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Field required"),
});

const FormikForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        confirmpassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const history = useHistory();
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();
  const onSubmit = async (values) => {
    const username = values.username;
    const password = values.password;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  return <FormikForm onSubmit={onSubmit} />;
};

export default SignUp;
