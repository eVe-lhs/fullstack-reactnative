import React from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import * as Yup from "yup";

import theme from "../../theme";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import useCreateReview from "../hooks/useCreateReveiw";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
  },
  itemsContainer: {
    width: "90%",
    alignItems: "stretch",
  },
  items: {
    marginVertical: 5,
  },
  multilineInput: {
    textAlignVertical: "top",
  },
  button: {
    textAlign: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    color: "white",
    padding: 10,
    fontWeight: "bold",
  },
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemsContainer}>
        <FormikTextInput
          name="ownername"
          placeholder="Repository Owner Name"
          testID="ownername"
          style={styles.items}
        />
        <FormikTextInput
          name="reponame"
          placeholder="Repository name"
          testID="reponame"
          style={styles.items}
        />
        <FormikTextInput
          name="rating"
          placeholder="Rating between 0 and 100"
          testID="rating"
          style={styles.items}
        />
        <FormikTextInput
          name="review"
          placeholder="Review"
          testID="review"
          style={styles.multilineInput}
          multiline
          style={styles.items}
        />
        <TouchableWithoutFeedback
          onPress={onSubmit}
          testID="submitButton"
          style={styles.items}
        >
          <Text style={styles.button}>Create Review</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const validationSchema = Yup.object().shape({
  ownername: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Repository Owner Name is required"),
  reponame: Yup.string()
    .min(3, "Password must be at least 3 characters")
    .required("Repository name is required"),
  rating: Yup.number()
    .min(0, "Rating must not be lower than 0")
    .max(100, "Rating must not be higher than 100")
    .required("Rating is required"),
  review: Yup.string().optional(),
});

export const ReviewFormikForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        ownername: "",
        reponame: "",
        rating: "",
        review: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReview = () => {
  const history = useHistory();
  const [createReview] = useCreateReview();
  const onSubmit = async (values) => {
    const ownername = values.ownername;
    const reponame = values.reponame;
    const rating = parseInt(values.rating);
    const review = values.review;

    try {
      await createReview({ ownername, reponame, rating, review });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  return <ReviewFormikForm onSubmit={onSubmit} />;
};

export default CreateReview;
