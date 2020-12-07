import { useMutation } from "@apollo/react-hooks";

import { DELETE_REVEIW } from "../graphql/mutations";

const useDelete = () => {
  const [deleteReview] = useMutation(DELETE_REVEIW);

  const del = async ({ id }) => {
    // call the mutate function here with the right arguments
    await deleteReview({
      variables: { id: id },
    });
  };

  return del;
};

export default useDelete;
