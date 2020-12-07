import { useQuery } from "@apollo/react-hooks";
import { Get_Repositories } from "../graphql/quries";

const useRepositories = ({ orderBy, orderDir, searchTerm, first }) => {
  const { data, loading, fetchMore, ...result } = useQuery(Get_Repositories, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: orderBy,
      orderDirection: orderDir,
      searchKeyword: searchTerm,
      first: first,
    },
  });
  // let repositories;
  // if (loading) {
  //   repositories = null;
  // } else {
  //   repositories = data.repositories;
  // }

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: Get_Repositories,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderBy: orderBy,
        orderDirection: orderDir,
        searchKeyword: searchTerm,
        first: first,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  return {
    repositories: data ? data.repositories : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
    OrderBy: orderBy,
    OrderDir: orderDir,
  };
};

export default useRepositories;
