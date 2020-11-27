import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";
import theme from "../../theme";
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingLeft: 20,
    flexDirection: "column",
    padding: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  personalDetails: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flex: 3,
  },
  details: {
    height: 100,
    paddingLeft: 20,
    justifyContent: "space-evenly",
    flex: 3,
  },

  languageBox: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    color: "white",
    padding: 8,
    alignSelf: "flex-start",
  },
  ratings: {
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
    flex: 2,
  },
  ratingContents: {
    textAlign: "center",
  },
});

const RespositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.personalDetails}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.details}>
          <Text fontSize="subheading" fontWeight="bold">
            {item.fullName}
          </Text>
          <Text color="textSecondary">{item.description}</Text>
          <Text style={styles.languageBox}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.ratings}>
        <View>
          <Text
            style={styles.ratingContents}
            fontSize="subheading"
            fontWeight="bold"
          >
            {(item.forksCount / 1000).toFixed(1)}k
          </Text>
          <Text style={styles.ratingContents} color="textSecondary">
            Forks
          </Text>
        </View>
        <View>
          <Text
            style={styles.ratingContents}
            fontSize="subheading"
            fontWeight="bold"
          >
            {(item.stargazersCount / 1000).toFixed(1)}k
          </Text>
          <Text style={styles.ratingContents} color="textSecondary">
            Stars
          </Text>
        </View>
        <View>
          <Text
            style={styles.ratingContents}
            fontSize="subheading"
            fontWeight="bold"
          >
            {item.ratingAverage}
          </Text>
          <Text style={styles.ratingContents} color="textSecondary">
            Rating
          </Text>
        </View>
        <View>
          <Text style={styles.ratingContents} fontWeight="bold">
            {item.reviewCount}
          </Text>
          <Text style={styles.ratingContents} color="textSecondary">
            Reviews
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RespositoryItem;
