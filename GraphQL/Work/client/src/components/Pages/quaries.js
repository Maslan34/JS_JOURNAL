import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client';

// GraphQL sorgusu

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
query getEvent($getEventId: ID){
  getEvent(id: $getEventId){
    location {
      name
      lat
      lng
    }
    from
    to
  }
}
`;

export const AUTHOR_SUBSCRIPTION = gql`

subscription Subscription {
  authorAdded
}
`;
