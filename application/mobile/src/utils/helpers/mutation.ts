import { gql } from "../hooks/useApolloClient";

export const CREATE_ROLL = gql`
  mutation CreateRoll($rollData: RollInputType!) {
    createRoll(rollData: $rollData) {
      id
      name
      deliveryType
      closingDate
    }
  }
`;

export const UPLOAD_PICTURE = gql`
  mutation UploadPicture($cloudinaryId: String!, $rollId: Float!) {
    uploadPicture(cloudinaryId: $cloudinaryId, rollId: $rollId)
  }
`;

export const LOGIN = gql`
  mutation Login($password: String!, $phoneNumber: String!) {
    login(password: $password, phoneNumber: $phoneNumber) {
      accessToken
      refreshToken
    }
  }
`;
