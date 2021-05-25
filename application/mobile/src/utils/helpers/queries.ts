import { gql } from "../hooks/useApolloClient";

export const GET_ROLLS = gql`
  query GetRolls {
    rolls {
      id
      name
    }
  }
`;

export const GET_ROLLS_BY_USER = gql`
  query GetRollsByUser($id: Float!) {
    rollsByUser(id: $id) {
      id
      name
      closingDate
      remainingPictures
      participants {
        id
      }
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      name
      id
      phoneNumber
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID) {
    user(id: $id) {
      id
    }
  }
`;
