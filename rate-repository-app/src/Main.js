import React from "react";
import { StyleSheet, View } from "react-native";
import { Switch, Route, Redirect } from "react-router-native";

import RepositoryList from "./components/RepositoryList";
import AppBar from "./components/AppBar";
import SignIn from "./components/SignIn";
import SingleRepository from "./components/SingleRepositoryItem";
import CreateReview from "./components/createReview";
import SignUp from "./components/SignUp";
import MyReviews from "./components/MyReviews";

export default function Main() {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signIn">
          <SignIn />
        </Route>
        <Route path="/repository/:id">
          <SingleRepository />
        </Route>
        <Route path="/createReview">
          <CreateReview />
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/myReviews">
          <MyReviews />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e4e8",
  },
});
