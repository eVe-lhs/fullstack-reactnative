import { gql } from "@apollo/react-hooks";

export const Authorize_User = gql`
  mutation authorize($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;
export const Create_Review = gql`
  mutation createReview(
    $reponame: String!
    $ownername: String!
    $rating: Int!
    $text: String
  ) {
    createReview(
      review: {
        repositoryName: $reponame
        ownerName: $ownername
        rating: $rating
        text: $text
      }
    ) {
      id
      userId
      repositoryId
    }
  }
`;
export const Create_User = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      username
      createdAt
    }
  }
`;

export const DELETE_REVEIW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;
