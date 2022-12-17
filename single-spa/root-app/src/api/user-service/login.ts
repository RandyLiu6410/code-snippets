import { gql } from "@apollo/client";
import { PROJECT_FIELDS, USER_FIELDS } from "./fragments";

export const LOGIN_MUTATION = gql`
  ${USER_FIELDS}
  mutation login($platformId: Int!, $email: String!, $password: String!) {
    login(platformId: $platformId, email: $email, password: $password) {
      id
      token
      userId
      expiredAt
      user {
        ...UserFields
      }
    }
  }
`;
