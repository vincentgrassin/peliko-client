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
