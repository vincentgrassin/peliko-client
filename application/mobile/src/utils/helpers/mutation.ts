import { gql } from "../hooks/useApolloClient";

export const CREATE_ROLL = gql`
  mutation CreateRoll($rollData: RollInputType!, $userId: Float!) {
    createRoll(rollData: $rollData, userId: $userId) {
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
    $userId: Float!
    $rollId: Float!
  ) {
    uploadPicture(cloudinaryId: $cloudinaryId, userId: $userId, rollId: $rollId)
  }
`;
