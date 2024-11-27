import data from "../../data.json" assert { type: "json" };
import { PubSub } from 'graphql-subscriptions'; 
const pubsub = new PubSub();

let events = data.events;
let users = data.users;
let participants = data.participants;
let locations = data.locations;

export const Query = {
  getAllUsers: () => users,
  getAllLocations: () => locations,
  getAllParticipants: () => participants,
  getAllEvents: () => events,

  getUser: (parent, args) => {
    return users.find((user) => user.id === Number(args.id));
  },
  getLocation: (parent, args) => {
    return locations.find((location) => location.id === Number(args.id));
  },
  getParticipant: (parent, args) => {
    return participants.find(
      (participant) => participant.id === Number(args.id)
    );
  },
  getEvent: (parent, args) => {
    return events.find((event) => event.id === Number(args.id));
  },
};
