import { useMutation } from "@apollo/react-hooks";

import { Create_User } from "../graphql/mutations";

const useSignIn = () => {
  const [createUser, result] = useMutation(Create_User);

  const signUp = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const { data } = await createUser({
      variables: { username: username, password: password },
    });
    return data;
  };

  return [signUp, result];
};

export default useSignIn;
