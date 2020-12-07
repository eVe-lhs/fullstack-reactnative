import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useParams } from "react-router-native";

import RepositoryItem from "./RepositoryItem";
import useOneRepository from "../hooks/useOneRepository";
import Text from "./Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 15,
  },
  ratingContainer: {
    alignSelf: "flex-start",
    flex: 1,
  },
  ratingCircle: {
    textAlign: "center",
    color: theme.colors.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    lineHeight: 50,
  },
  reviewContainer: {
    paddingLeft: 20,
    flex: 6,
  },
  separator: {
    height: 10,
  },
});
export const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <RepositoryItem item={repository} url />
    </View>
  );
};

export const ReviewItem = ({ review }) => {
  const date = new Date(review.createdAt);
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  const newDate = `${day}-${month}-${year}`;

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text
          fontWeight="bold"
          fontSize="subheading"
          style={styles.ratingCircle}
        >
          {review.rating}
        </Text>
      </View>
      <View style={styles.reviewContainer}>
        <Text fontWeight="bold" fontSize="subheading">
          {review.user.username}
        </Text>
        <Text color="textSecondary">{newDate}</Text>
        <Text
          style={{
            paddingTop: 10,
          }}
        >
          {review.text}
        </Text>
      </View>
    </View>
  );
};

const SingleRepositoryItem = () => {
  let { id } = useParams();
  const { repository, fetchMore, reviews, loading } = useOneRepository({
    id,
    first: 3,
  });
  if (loading) {
    return <Text>Loading</Text>;
  }
  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.8}
      // ...
    />
  );
};
export default SingleRepositoryItem;
