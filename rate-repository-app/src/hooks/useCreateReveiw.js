import { useMutation } from "@apollo/react-hooks";

import { Create_Review } from "../graphql/mutations";

const useCreateReview = () => {
  const [createReview, result] = useMutation(Create_Review);
  const Create = async ({ ownername, reponame, rating, review }) => {
    // call the mutate function here with the right arguments
    const { data } = await createReview({
      variables: {
        ownername: ownername,
        reponame: reponame,
        rating: rating,
        text: review,
      },
    });
    return data;
  };
  return [Create, result];
};

export default useCreateReview;
