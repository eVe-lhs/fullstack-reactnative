import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import { Link } from "react-router-native";

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" component={TouchableWithoutFeedback}>
          <Text style={styles.text} fontSize="appbar" fontWeight="bold">
            Repositories
          </Text>
        </Link>
        <Link to="/signIn" component={TouchableWithoutFeedback}>
          <Text style={styles.text} fontSize="appbar" fontWeight="bold">
            Sign In
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
