import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import gql from "graphql-tag";
import data from './data.json' assert { type: 'json' };
import {nanoid} from "nanoid";


let events = data.events;
let users = data.users;
let participants = data.participants;
let locations = data.locations;


const typeDefs = gql`

  type Event {
  id: ID!
  title: String!
  desc: String
  date: String!
  from: String!
  to: String!
  location_id: Int!
  user_id: Int!
  user:User # Event ile User İlişkisi
  location:Location # Event ile Location İlişkisi
  participants:[Participant] # Event ile Participant İlişkisi
}


type Location {
  id: ID!
  name: String!
  desc: String
  lat: Float!
  lng: Float!
}

type User {
  id: ID!
  username: String!
  email: String!
  events: [Event]  # User ile Event İlişkisi
}


type Participant {
  id: ID!
  user_id: Int!
  event_id: Int!
}

  

  type Query {
    getAllUsers: [User]
    getAllLocations: [Location]
    getAllParticipants: [Participant]
    getAllEvents: [Event]

    getUser(id:ID):User
    getLocation(id:ID):Location
    getParticipant(id:ID):Participant
    getEvent(id:ID):Event
  }

  
`;

const resolvers = {
  Query: {
    getAllUsers: () => users,
    getAllLocations: () => locations,
    getAllParticipants: () => participants,
    getAllEvents: () => events,


    getUser:(parent,args) =>{
      return users.find( user => user.id === Number(args.id) );
    },
    getLocation:(parent,args) =>{
      return locations.find( location => location.id === Number (args.id))
    },
    getParticipant:(parent,args) =>{
      return participants.find( participant => participant.id === Number(args.id))
    },
    getEvent:(parent,args) =>{
      return events.find( event => event.id === Number (args.id) )
    }

  },



  // İlişkiler
  User: {
    events: (parent, args) => {
      const events = events.find((event) => event.user_id === parent.id);
      return events;
    },
  },


  Event: {
    user: (parent, args) => {
      const user = users.find((user) => user.id === parent.user_id);
      return user;
    },
  },


  Event: {
    location: (parent, args) => {
      const location = locations.find((location) => locations.id === parent.location_id);
      return location;
    },
  },

  Event: {
    participants: (parent, args) => {
      const participants = participants.find((location) => participants.event_id === parent.id);
      return participants;
    },
  },
  // İlişkiler

 
};



const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4002 },
});

console.log(`🚀  Server ready at: ${url}`);
