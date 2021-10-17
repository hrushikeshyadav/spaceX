import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation DeleteUser($where: users_bool_exp!) {
    delete_users(where: $where) {
      returning {
        id
        name
      }
    }
  }
`;

export const EDIT_USER = gql`
  mutation EditUser($_set: users_set_input, $where: users_bool_exp!) {
    update_users(_set: $_set, where: $where) {
      returning {
        id
        name
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($objects: [users_insert_input!]!) {
    insert_users(objects: $objects) {
      returning {
        id
        name
        rocket
      }
    }
  }
`;
