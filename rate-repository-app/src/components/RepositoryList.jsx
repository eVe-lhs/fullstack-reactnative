import React, { useState } from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import Picker from "react-native-picker-select";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

import { Text } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useHistory } from "react-router-native";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  separator: {
    height: 10,
  },
  selectField: {
    fontSize: theme.fontSizes.subheading,
    height: 50,
    backgroundColor: "#e1e4e8",
  },
});

const SelectField = ({ setOrderBy, setOrderDir, orderBy, orderDir }) => {
  let val;
  if (orderBy === "CREATED_AT" && orderDir === "DESC") {
    val = "latest";
  } else if ((orderBy = "RATING_AVERAGE" && orderDir === "DESC")) {
    val = "highest";
  } else {
    val = "lowest";
  }
  return (
    <View style={styles.container}>
      <Picker
        onValueChange={(value) => {
          switch (value) {
            case "latest":
              {
                setOrderBy("CREATED_AT");
                setOrderDir("DESC");
              }
              break;
            case "highest":
              {
                setOrderBy("RATING_AVERAGE");
                setOrderDir("DESC");
              }
              break;
            case "lowest":
              {
                setOrderBy("RATING_AVERAGE");
                setOrderDir("ASC");
              }
              break;
          }
        }}
        placeholder={{
          label: "Sort by",
          value: null,
        }}
        value={val}
        items={[
          { label: "Latest repositories", value: "latest" },
          { label: "Highest rated repositories", value: "highest" },
          { label: "Lowest rated repositories", value: "lowest" },
        ]}
        style={styles.selectField}
      />
    </View>
  );
};

const SearchBar = ({ searchQuery, onChangeSearch }) => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  setOrderBy,
  setOrderDir,
  orderBy,
  orderDir,
  onEndReach,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  const history = useHistory();
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => history.push(`/repository/${item.id}`)}
          key={item.id}
        >
          <RepositoryItem item={item} />
        </TouchableOpacity>
      )}
      ListHeaderComponent={() =>
        SelectField({ setOrderBy, setOrderDir, orderBy, orderDir })
      }
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDir, setOrderDir] = useState("DESC");

  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  const [searchTerm] = useDebounce(searchQuery, 500);

  const {
    repositories,
    OrderBy,
    OrderDir,
    fetchMore,
    loading,
  } = useRepositories({
    orderBy,
    orderDir,
    searchTerm,
    first: 4,
  });

  const onEndReach = () => {
    fetchMore();
  };
  // if (loading) {
  //   return <Text>Loading</Text>;
  // }
  return (
    <>
      {/* <SelectField
        setOrderBy={setOrderBy}
        setOrderDir={setOrderDir}
        orderBy={orderBy}
      /> */}
      <SearchBar searchQuery={searchQuery} onChangeSearch={onChangeSearch} />
      <RepositoryListContainer
        repositories={repositories}
        setOrderBy={setOrderBy}
        setOrderDir={setOrderDir}
        orderBy={OrderBy}
        orderDir={OrderDir}
        onEndReach={onEndReach}
        // searchQuery={searchQuery}
        // onChangeSearch={onChangeSearch}
      />
    </>
  );
};

export default RepositoryList;
