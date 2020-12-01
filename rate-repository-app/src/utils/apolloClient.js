import ApolloClient from "apollo-boost";
import Constant from "expo-constants";
const createApolloClient = (authStorage) => {
  return new ApolloClient({
    request: async (operation) => {
      try {
        const accessToken = await authStorage.getAccessToken();
        operation.setContext({
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
    // Replace the IP address part with your own IP address!
    uri: Constant.manifest.extra.apolloUri,
  });
};

export default createApolloClient;
