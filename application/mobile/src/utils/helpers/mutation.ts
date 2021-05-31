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
  mutation UploadPicture(
    $cloudinaryId: String!
    $userId: Float!
    $rollId: Float!
  ) {
    uploadPicture(cloudinaryId: $cloudinaryId, userId: $userId, rollId: $rollId)
  }
`;
