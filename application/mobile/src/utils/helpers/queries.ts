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
  query GetRollsByUser($isOpenTab: Boolean!) {
    rollsByUser(isOpenTab: $isOpenTab) {
      id
      name
      closingDate
      remainingPictures
      coverPictureId
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
  query GetUserById {
    getUserById {
      id
      name
      phoneNumber
      avatarCloudinaryPublicId
    }
  }
`;

export const GET_ROLL_BY_ID = gql`
  query GetRollById($id: Float!) {
    roll(id: $id) {
      name
      closingDate
      remainingPictures
      description
      participants {
        phoneNumber
        id
        pictureCount
        userId
      }
    }
  }
`;

export const GET_INVITATIONS_BY_USER = gql`
  query GetInvitationsByUser {
    invitationRollsByUser {
      roll {
        id
        name
        closingDate
      }
      admin {
        name
      }
    }
  }
`;

export const GET_PICTURES_BY_ROLL = gql`
  query GetPicturesByRoll($rollId: Float!) {
    getPicturesByRoll(rollId: $rollId) {
      id
      cloudinaryPublicId
      height
      width
      createdAt
      user {
        id
        name
        phoneNumber
      }
    }
  }
`;

export const GET_INVITATION_COUNT_BY_USER = gql`
  query GetInvitationCountByUser {
    invitationNotificationCountByUser
  }
`;

export const GET_USERS_BY_IDS = gql`
  query GetUsersByIds($ids: [Float!]!) {
    getUsersByIds(ids: $ids) {
      id
      name
      avatarCloudinaryPublicId
      phoneNumber
    }
  }
`;
