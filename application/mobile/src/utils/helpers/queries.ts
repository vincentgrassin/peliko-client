import { gql } from "../hooks/useApolloClient";

export const GET_ROLLS = gql`
  query GetRolls {
    rolls {
      id
      name
    }
  }
`;

export const GET_THUMBNAIL_ROLLS_LIST_BY_USER = gql`
  query RollsByUser($id: Int!) {
    rollsByUser(id: $id) {
      id
    }
  }
`;

const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
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

export const TEST = gql`
  query GetUserById($name: String) {
    test(name: "efaefaefaefa") {
      id
      name
    }
  }
`;
