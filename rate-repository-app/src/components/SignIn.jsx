import React from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import * as Yup from "yup";

import theme from "../../theme";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import useSignIn from "../hooks/useSignIn";

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
        <FormikTextInput
          name="username"
          placeholder="Username"
          testID="username"
        />
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry
          testID="password"
        />
        <TouchableWithoutFeedback onPress={onSubmit} testID="submitButton">
          <Text style={styles.signInButton}>Sign In</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(1, "Username must be at least 1 characters")
    .required("Field required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Field required"),
});

export const FormikForm = ({ onSubmit }) => {
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

const SignIn = () => {
  const history = useHistory();
  const [signIn] = useSignIn();
  const onSubmit = async (values) => {
    const username = values.username;
    const password = values.password;

    try {
      await signIn({ username, password });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  return <FormikForm onSubmit={onSubmit} />;
};

export default SignIn;
