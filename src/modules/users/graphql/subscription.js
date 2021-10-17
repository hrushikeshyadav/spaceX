import { gql } from '@apollo/client';

export const USER_SUBSCRIPTION = gql`
  subscription userAdded {
    users(order_by: { timestamp: desc }) {
      id
      name
      rocket
    }
  }
`;
