import { gql } from "@apollo/react-hooks";

export const Authorize_User = gql`
  mutation authorize($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;
