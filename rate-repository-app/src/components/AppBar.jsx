import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import { useHistory } from "react-router-dom";
import Text from "./Text";
import { Link } from "react-router-native";
import { useQuery } from "@apollo/react-hooks";
import { GET_AUTHORIZED_USER } from "../graphql/quries";
import AuthStorageContext from "../contexts/AuthStorageContext";
import { useApolloClient } from "@apollo/client";
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#e83225",
    flexDirection: "row",
  },
  text: {
    padding: 20,
    paddingRight: 8,
    color: "white",
  },
});

const AppBar = () => {
  const history = useHistory();
  const { data, loading } = useQuery(GET_AUTHORIZED_USER);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const signOut = async () => {
    history.push("/");
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };
  let user;
  if (loading) {
    user = null;
  } else {
    user = data.authorizedUser;
  }
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" component={TouchableWithoutFeedback}>
          <Text style={styles.text} fontSize="appbar" fontWeight="bold">
            Repositories
          </Text>
        </Link>
        {user ? (
          <>
            <Link to="/createReview" component={TouchableWithoutFeedback}>
              <Text style={styles.text} fontSize="appbar" fontWeight="bold">
                Create Review
              </Text>
            </Link>
            <Link to="/myReviews" component={TouchableWithoutFeedback}>
              <Text style={styles.text} fontSize="appbar" fontWeight="bold">
                My reviews
              </Text>
            </Link>
            <TouchableWithoutFeedback onPress={signOut}>
              <Text style={styles.text} fontSize="appbar" fontWeight="bold">
                Sign Out
              </Text>
            </TouchableWithoutFeedback>
          </>
        ) : (
          <>
            <Link to="/signIn" component={TouchableWithoutFeedback}>
              <Text style={styles.text} fontSize="appbar" fontWeight="bold">
                Sign In
              </Text>
            </Link>
            <Link to="/signUp" component={TouchableWithoutFeedback}>
              <Text style={styles.text} fontSize="appbar" fontWeight="bold">
                Sign Up
              </Text>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
