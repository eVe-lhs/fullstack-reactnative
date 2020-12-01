import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import { Link } from "react-router-native";
import { useQuery } from "@apollo/react-hooks";
import { authoriedUser } from "../graphql/quries";
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
  const { data, loading } = useQuery(authoriedUser);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };
  let user;
  if (loading) {
    user = null;
  } else {
    user = data.authorizedUser;
    console.log(user);
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
            <Text style={styles.text} fontSize="appbar" fontWeight="bold">
              {user.username}
            </Text>
            <TouchableWithoutFeedback onPress={signOut}>
              <Text style={styles.text} fontSize="appbar" fontWeight="bold">
                Sign Out
              </Text>
            </TouchableWithoutFeedback>
          </>
        ) : (
          <Link to="/signIn" component={TouchableWithoutFeedback}>
            <Text style={styles.text} fontSize="appbar" fontWeight="bold">
              Sign In
            </Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
