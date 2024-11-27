import { nanoid } from "nanoid";
import data from "../../data.json" assert { type: "json" };

import { PubSub } from 'graphql-subscriptions'; 
const pubsub = new PubSub();

let events = data.events;
let users = data.users;
let participants = data.participants;
let locations = data.locations;

export const Mutation = {
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

    updateLocation: (parent, { id, data }) => {
      const location_index = locations.findIndex(
        (location) => location.id == id
      );

      if (location_index === -1)
        throw new Error(
          "The location with the mentioned id could not be found!"
        );
      else {
        const Location = {
          ...locations[location_index],
          ...data,
        };
        locations[location_index] = Location;
        return Location;
      }
    },

    deleteLocation: (parent, args) => {
      const location_index = locations.findIndex(
        (location) => location.id == args.id
      );

      if (location_index === -1)
        throw new Error(
          "The location with the mentioned id could not be found!"
        );
      else {
        const deletedLocation = locations[location_index];
        locations.splice(location_index, 1);

        return deletedLocation;
      }
    },

    deleteAllLocations: (parent, args) => {
      const count = locations.length;

      locations.length = 0;

      return {
        count: count,
      };
    },

    //Location

    //Participant

    addParticipant: (parent, args) => {
      const Participant = {
        id: nanoid(),
        user_id: args.user_id,
        event_id: args.event_id,
      };
      pubsub.publish("participantAdded", { participantAdded: Participant });
      participants.push(Participant);

      return Participant;
    },

    updateParticipant: (parent, args) => {
      const participant_index = participants.findIndex(
        (participant) => participant.id == args.id
      );
      console.log(args);

      const Participant = {
        id: args.id,
        user_id: args.user_id,
        event_id: args.event_id,
      };

      participants[participant_index] = Participant;

      return Participant;
    },

    deleteParticipant: (parent, args) => {
      const participant_index = participants.findIndex(
        (participant) => participant.id == args.id
      );

      if (participant_index === -1)
        throw new Error(
          "The Participant with the mentioned id could not be found!"
        );
      else {
        const deletedParticipant = participants[participant_index];
        participants.splice(participant_index, 1);

        return deletedParticipant;
      }
    },

    deleteAllParticipants: (parent, args) => {
      const count = participants.length;

      participants.length = 0;

      return {
        count: count,
      };
    },

    //Participant

    //User

    addUser: (parent, args) => {
      const User = {
        id: nanoid(),
        username: args.username,
        email: args.email,
      };
      pubsub.publish("userCreated", { userCreated: User });
      users.push(User);

      return User;
    },

    updateUser: (parent, args) => {
      const user_index = users.findIndex((user) => user.id == args.id);

      if (user_index === -1)
        throw new Error("The User with the mentioned id could not be found!");
      else {
        const User = {
          id: args.id,
          email: args.email,
          username: args.username,
        };
        users[user_index] = User;

        return User;
      }
    },

    deleteUser: (parent, args) => {
      const user_index = users.findIndex((user) => user.id == args.id);

      if (user_index === -1)
        throw new Error("The User with the mentioned id could not be found!");
      else {
        const deletedUser = users[user_index];
        users.splice(user_index, 1);

        return deletedUser;
      }
    },

    deleteAllUsers: (parent, args) => {
      const count = users.length;

      users.length = 0;

      return {
        count: count,
      };
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
        user_id: args.user_id,
      };
      pubsub.publish("eventCreated", { eventCreated: Event });
      events.push(Event);

      return Event;
    },

    updateEvent: (parent, { id, data }) => {
      const event_index = events.findIndex((event) => event.id == id);

      const Event = {
        ...events[event_index],
        ...data,
      };

      events[event_index] = Event;

      return Event;
    },

    deleteEvent: (parent, args) => {
      const event_index = events.findIndex((event) => event.id == args.id);

      if (event_index === -1)
        throw new Error("The Event with the mentioned id could not be found!");
      else {
        const deletedEvent = events[event_index];
        events.splice(event_index, 1);

        return deletedEvent;
      }
    },

    deleteAllEvents: (parent, args) => {
      const count = events.length;

      events.length = 0;

      return {
        count: count,
      };
    },

    //Event
  }

  // Mutations
