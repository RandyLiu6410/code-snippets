import { gql } from "@apollo/client";

export const PROJECT_FIELDS = gql`
  fragment ProjectFields on Project {
    id
    name
    description
    info
    createdAt
    updatedAt
  }
`;

export const PLATFORM_FIELDS = gql`
  ${PROJECT_FIELDS}
  fragment PlatformFields on Platform {
    id
    name
    description
    info
    createdAt
    updatedAt
    projects {
      ...ProjectFields
    }
  }
`;

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    name
    displayName
    gender
    email
    phone
    avatarPath
    enable
    info
    admin
    platformId
    createdAt
    updatedAt
  }
`;
