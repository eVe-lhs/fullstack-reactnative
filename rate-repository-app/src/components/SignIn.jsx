import React from "react";
import { Formik } from "formik";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import * as Yup from "yup";

import theme from "../../theme";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
  },
  items: {
    height: 180,
    justifyContent: "space-between",
    margin: 8,
    width: "90%",
    alignItems: "stretch",
  },
  signInButton: {
    textAlign: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    color: "white",
    padding: 10,
    fontWeight: "bold",
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry
        />
        <TouchableWithoutFeedback onPress={onSubmit}>
          <Text style={styles.signInButton}>Sign In</Text>
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
    .min(3, "Password must be at least 3 characters")
    .required("Field required"),
});

const SignIn = () => {
  const onSubmit = (values) => {
    const username = values.username;
    const password = values.username;

    if (username && password) {
      console.log(`Your username is ${username} and password is ${password}`);
    }
  };
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
