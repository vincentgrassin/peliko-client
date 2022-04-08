import { gql } from "../hooks/useApolloClient";

export const CREATE_ROLL = gql`
  mutation CreateRoll($rollData: RollInputViewModel!) {
    createRoll(rollData: $rollData) {
      id
      name
      deliveryType
      closingDate
    }
  }
`;

export const UPLOAD_PICTURE = gql`
  mutation UploadPicture(
    $cloudinaryId: String!
    $height: Float!
    $width: Float!
    $rollId: Float!
  ) {
    uploadPicture(
      cloudinaryId: $cloudinaryId
      height: $height
      width: $width
      rollId: $rollId
    )
  }
`;

export const LOG_IN = gql`
  mutation Login($password: String!, $phoneNumber: String!) {
    login(password: $password, phoneNumber: $phoneNumber) {
      accessToken
      refreshToken
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($name: String!, $password: String!, $phoneNumber: String!) {
    createUser(name: $name, password: $password, phoneNumber: $phoneNumber) {
      accessToken
      refreshToken
    }
  }
`;

export const JOIN_ROLL = gql`
  mutation JoinRoll($rollId: Float!, $accessCode: String!) {
    joinRoll(rollId: $rollId, accessCode: $accessCode)
  }
`;

export const DECLINE_INVITATION = gql`
  mutation DeclineInvitation($rollId: Float!) {
    declineRollInvitation(rollId: $rollId)
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $profilePicture: String!
    $phoneNumber: String!
    $name: String!
  ) {
    updateUser(
      profilePicture: $profilePicture
      phoneNumber: $phoneNumber
      name: $name
    ) {
      name
      phoneNumber
      avatarCloudinaryPublicId
      id
    }
  }
`;

export const UPDATE_USER_PUSH_TOKEN = gql`
  mutation UpdateUserPushToken($pushToken: String!) {
    updateUserPushToken(pushToken: $pushToken)
  }
`;
