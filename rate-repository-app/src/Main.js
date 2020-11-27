import React from "react";
import { StyleSheet, View } from "react-native";
import { Switch, Route, Redirect } from "react-router-native";

import RepositoryList from "./components/RepositoryList";
import AppBar from "./components/AppBar";
import SignIn from "./components/SignIn";

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
