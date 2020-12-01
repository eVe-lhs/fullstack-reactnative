import { useMutation } from "@apollo/react-hooks";
import { useApolloClient } from "@apollo/client";
import { useContext } from "react";

import { Authorize_User } from "../graphql/mutations";
import AuthStorageContext from "../contexts/AuthStorageContext";

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const [authorize, result] = useMutation(Authorize_User);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const { data } = await authorize({
      variables: { username: username, password: password },
    });
    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();
    console.log(authStorage.getAccessToken());
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
