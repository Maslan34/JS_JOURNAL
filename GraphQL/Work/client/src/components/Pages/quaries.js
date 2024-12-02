import { gql } from '@apollo/client';

export const GET_EVENTS = gql`
  query getAllEvents{
  getAllEvents{    
    id
    title
    desc
    date
  }
}
`;

export const GET_BOOKS = gql`
 query BookQuery {
  bookQuery {
    id
    title
    author_id
    author {
      id
      name
      lastname
      description
    }
    short_description
  }
}
`;

export const GET_EVENT = gql`
query getEvent($getEventId: ID){
  getEvent(id: $getEventId){
    title
    date
    location {
      name
      lat
      lng
    }
    
    user {
      username
      email
    }
  }
}
`;

export const GET_COMMNETS = gql`
query BookQuerySinlge($bookQuerySinlgeId: ID!) {
  bookQuerySinlge(id: $bookQuerySinlgeId) {
    comments {
      fullName
      comment
    }
  }
}
`;

export const GET_EXTRA_EVENT_INFO = gql`
query GetEvent($getEventId: ID) {
  getEvent(id: $getEventId) {
    user {
      username
      email
    }
    user_id
    location {
      name
      desc
      lat
      lng
    }
    participants {
      id
      user {
        id
        username
        email
      }
    }
  }
}
`;

export const EVENT_SUBSCRIPTION = gql`
subscription EventCreated {
  eventCreated {
    id
    title
    desc
    date
    from
    to
    location_id
  }
}
`;

export const EVENT_COUNT = gql`
subscription Subscription {
  eventCount
}
`;

export const PARTICIPANT_SUBSCRIPTION = gql`
subscription ParticipantAdded {
  participantAdded {
    id
    event_id
    user {
      email
      username
    }
  }
}
`;


export const EVENT_DELETE_SUBSCRIPTION = gql`

subscription EventDeleted {
  eventDeleted {
    id
    title
    desc
    date
    from
    to
    location_id
  }
}
`;


