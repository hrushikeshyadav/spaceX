import { gql } from "@apollo/client";

export const USER = gql`
  query getUsers($limit: Int, $offset: Int){
    users(order_by: { timestamp: desc },limit:$limit,offset:$offset) {
      name
      id
      rocket
    }
  }
`;

export const SEARCH_FILTER = gql`
  query GetSearchText($where: users_bool_exp,$limit: Int, $offset: Int) {
    users(where: $where, order_by: { timestamp: desc },limit:$limit,offset:$offset) {
      id
      name
      rocket
    }
  }
`;

export const USER_DETAILS = gql`
  query GetUserDetail($where: users_bool_exp!) {
    users(where: $where) {
      name
      rocket
    }
  }
`;
export const USER_COUNT = gql`
{
  users_aggregate {
    aggregate {
      count
    }
  }
}
`;
