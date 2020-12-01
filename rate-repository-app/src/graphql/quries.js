import { gql } from "@apollo/react-hooks";

export const Get_Repositories = gql`
  query {
    repositories {
      edges {
        node {
          fullName
          ownerAvatarUrl
          description
          language
          ratingAverage
          forksCount
          reviewCount
          stargazersCount
        }
      }
    }
  }
`;

export const authoriedUser = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;
