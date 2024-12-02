import { gql } from "@apollo/client";
export const GET_ALL_USERS = gql`
  query getAllUSers {
    getAllUsers {
      id
      username
    }
  }
`;

export const NEW_EVENT_MUTUATION = gql`
  mutation AddEvent(
    $title: String
    $desc: String
    $date: String
    $from: String
    $to: String
    $locationId: Int
    $userId: Int
  ) {
    addEvent(
      title: $title
      desc: $desc
      date: $date
      from: $from
      to: $to
      location_id: $locationId
      user_id: $userId
    ) {
      id
      title
      desc
      date
    }
  }
`;

export const EVENT_COUNT = gql`
  subscription Subscription {
    eventCount
  }
`;

export const GET_EVENTS = gql`
  query getAllEvents {
    getAllEvents {
      id
      title
      desc
      date
    }
  }
`;
