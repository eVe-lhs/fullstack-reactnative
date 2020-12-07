import React from "react";
import { ReviewItem, ItemSeparator } from "./SingleRepositoryItem";
import { useQuery } from "@apollo/react-hooks";
import { GET_AUTHORIZED_USER } from "../graphql/quries";
import {
  FlatList,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { useHistory } from "react-router-native";
import theme from "../../theme";
import useDelete from "../hooks/useDelete";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "space-around",
    paddingBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  primaryButton: {
    padding: 15,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    color: "white",
    textAlign: "center",
  },
  dangerButton: {
    padding: 15,
    paddingHorizontal: 30,
    backgroundColor: theme.colors.danger,
    borderRadius: 5,
    color: "white",
    textAlign: "center",
  },
});

const MyReviewItem = ({ review, refetch }) => {
  const history = useHistory();
  const del = useDelete();
  return (
    <View style={styles.container}>
      <ReviewItem review={review} />
      <View style={styles.buttonContainer}>
        <TouchableWithoutFeedback
          onPress={() => history.push(`/repository/${review.repository.id}`)}
        >
          <Text style={styles.primaryButton}>View Repository</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            del({ id: review.id });
            refetch();
          }}
        >
          <Text style={styles.dangerButton}>Delete Review</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { data, loading, refetch } = useQuery(GET_AUTHORIZED_USER, {
    variables: {
      includeReviews: true,
    },
  });
  const reviews =
    !loading && data
      ? data.authorizedUser.reviews
        ? data.authorizedUser.reviews.edges.map((edge) => edge.node)
        : []
      : undefined;

  return (
    <>
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <MyReviewItem review={item} refetch={refetch} />
        )}
        keyExtractor={({ id }) => id}
      />
    </>
  );
};

export default MyReviews;
