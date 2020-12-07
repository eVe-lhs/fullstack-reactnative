import { useQuery } from "@apollo/react-hooks";
import { GetOneRepository } from "../graphql/quries";

const useRepositories = ({ id }) => {
  const { loading, data, fetchMore, ...result } = useQuery(GetOneRepository, {
    fetchPolicy: "cache-and-network",
    variables: { id: id },
  });

  //   let repository;
  //   let reviews;
  //   if (loading) {
  //     return null;
  //   } else {
  //     repository = data.repository;
  //     reviews = data.repository.reviews
  //       ? data.repository.reviews.edges.map((edge) => edge.node)
  //       : [];
  //   }

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GetOneRepository,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          },
        };

        return nextResult;
      },
    });
  };
  const reviews =
    !loading && data
      ? data.repository.reviews
        ? data.repository.reviews.edges.map((edge) => edge.node)
        : []
      : undefined;
  return {
    repository: !loading && data ? data.repository : undefined,
    reviews,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
