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


  type deleteCount {
    count:Int
  }

  input locationInput{
    name:String,desc:String,lat:Float,lng:Float
  }

  input eventInput{
    title:String,desc:String,date:String,from:String,to:String,location_id:Int,user_id:Int
  }

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
  desc: String!
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

  type Mutation {

    #Location 
    addLocation(name:String,desc:String,lat:Float,lng:Float):Location
    updateLocation(id:ID,data:locationInput): Location
    deleteLocation(id:ID): Location
    deleteAllLocations: deleteCount

     #Participant 
    addParticipant(user_id:Int,event_id:Int):Participant
    updateParticipant(id:ID,user_id:Int,event_id:Int): Participant
    deleteParticipant(id:ID): Participant
    deleteAllParticipants: deleteCount

    #Event 
    addEvent(title:String,desc:String,date:String,from:String,to:String,location_id:Int,user_id:Int):Event
    updateEvent(id:ID,data:eventInput): Event
    deleteEvent(id:ID): Event
    deleteAllEvents: deleteCount


    #User 
    addUser(username:String,email:String):User
    updateUser(id:ID,username:String,email:String): User
    deleteUser(id:ID): User
    deleteAllUsers: deleteCount
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



  // Mutations

  Mutation:{



    //Location

    addLocation: (parent, args) => {
  
      const Location = {
        id: nanoid(),
        name: args.name,
        desc: args.desc,
        lat: args.lat,
        lng: args.lng,
      };
  
      locations.push(Location);

  
      return Location;
    },

    updateLocation: (parent, {id,data}) => {
      
      const location_index = locations.findIndex(location => location.id == id);

      if(location_index === -1 )
        throw new Error("The location with the mentioned id could not be found!");
      else{

        const Location = {
          ...locations[location_index],
          ...data
        };
        locations[location_index] = Location;
        return Location;
      }
      
    },


    deleteLocation: (parent, args) => {

      const location_index = locations.findIndex(location => location.id == args.id);
      
      if(location_index === -1 )
        throw new Error("The location with the mentioned id could not be found!");
      else{
        const deletedLocation =locations[location_index]
        locations.splice(location_index,1)

        return deletedLocation;
      }
      
  
      
    },

    deleteAllLocations: (parent, args) => {

        const count = locations.length

        locations.length = 0

        return {
          count: count
        }
      
    },

    //Location


    //Participant

    addParticipant: (parent, args) => {

      const Participant = {
        id: nanoid(),
        user_id: args.user_id,
        event_id: args.event_id,
      };
  
      participants.push(Participant);

  
      return Participant;
    },

    updateParticipant: (parent, args) => {

      const participant_index = participants.findIndex(participant => participant.id == args.id);
      console.log(args)

      const Participant = {
        id:args.id,
        user_id:args.user_id,
        event_id:args.event_id,
      };
  
      participants[participant_index] = Participant;
  
      return Participant;
    },


    deleteParticipant: (parent, args) => {

      const participant_index = participants.findIndex(participant => participant.id == args.id);
      
      if(participant_index === -1 )
        throw new Error("The Participant with the mentioned id could not be found!");
      else{
        const deletedParticipant =participants[participant_index]
        participants.splice(participant_index,1)

        return deletedParticipant;
      }
      
  
      
    },

    deleteAllParticipants: (parent, args) => {

        const count = participants.length

        participants.length = 0

        return {
          count: count
        }
      
    },

    //Participant




    //User

    addUser: (parent, args) => {

      const User = {
        id: nanoid(),
        username: args.username,
        email: args.email,
      };
  
      users.push(User);

  
      return User;
    },

    updateUser: (parent, args) => {

      const user_index = users.findIndex(user => user.id == args.id);
  
      if(user_index === -1)
        throw new Error("The User with the mentioned id could not be found!");
      else{
      const User = {
        id:args.id,
        email:args.email,
        username:args.username


      };
      users[user_index] = User;
  
      return User;
    }
  },


    deleteUser: (parent, args) => {

      const user_index = users.findIndex(user => user.id == args.id);
      
      if(user_index === -1 )
        throw new Error("The User with the mentioned id could not be found!");
      else{
        const deletedUser =users[user_index]
        users.splice(user_index,1)

        return deletedUser;
      }
      
  
      
    },

    deleteAllUsers: (parent, args) => {

        const count = users.length

        users.length = 0

        return {
          count: count
        }
      
    },

    //User




     //Event

     addEvent: (parent, args) => {

      const Event = {
        id: nanoid(),
        title: args.title,
        desc: args.desc,
        date: args.date,
        from: args.from,
        to: args.to,
        location_id: args.location_id,
        user_id: args.user_id
      };
  
      events.push(Event);

  
      return Event;
    },

    updateEvent: (parent, {id,data}) => {

      const event_index = events.findIndex(event => event.id == id);
      
      const Event = {
        ...events[event_index],
        ...data
      };
  
      events[event_index] = Event;
  
      return Event;
    },


    deleteEvent: (parent, args) => {

      const event_index = events.findIndex(event => event.id == args.id);
      
      if(event_index === -1 )
        throw new Error("The Event with the mentioned id could not be found!");
      else{
        const deletedEvent =events[event_index]
        events.splice(event_index,1)

        return deletedEvent;
      }
      
  
      
    },

    deleteAllEvents: (parent, args) => {

        const count = events.length

        events.length = 0

        return {
          count: count
        }
      
    },

    //Event



  }

  // Mutations
 
};



const server = new ApolloServer({
  typeDefs,
  resolvers,
  //plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4002 },
});

console.log(`🚀  Server ready at: ${url}`);
