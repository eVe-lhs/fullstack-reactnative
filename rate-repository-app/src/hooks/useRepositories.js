import { useQuery } from "@apollo/react-hooks";
import { Get_Repositories } from "../graphql/quries";

const useRepositories = () => {
  const { data, loading } = useQuery(Get_Repositories, {
    fetchPolicy: "cache-and-network",
  });
  let repositories;
  if (loading) {
    repositories = null;
  } else {
    repositories = data.repositories;
  }
  return {
    repositories,
    loading,
  };
};

export default useRepositories;
