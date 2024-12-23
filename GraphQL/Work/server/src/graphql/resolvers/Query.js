import data from "../../data.json" assert { type: "json" };


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
    return users.find((user) => user.id == (args.id));
  },
  getLocation: (parent, args) => {
    return locations.find((location) => location.id == (args.id));
  },
  getParticipant: (parent, args) => {
    return participants.find(
      (participant) => participant.id == (args.id)
    );
  },
  getEvent: (parent, args) => {
    //console.log(args)
    return events.find((event) => event.id == (args.id));
  },
};
