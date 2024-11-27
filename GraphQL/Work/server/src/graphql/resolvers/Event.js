import data from "../../data.json" assert { type: "json" };

let events = data.events;
let users = data.users;
let participants = data.participants;
let locations = data.locations;

export const Event = {
  user: (parent, args) => {
    return users.find((user) => user.id === parent.user_id);
  },
  location: (parent, args) => {
    return locations.find((location) => location.id === parent.location_id);
  },
  participants: (parent, args) => {
    return participants.filter(
      (participant) => participant.event_id === parent.id
    );
  },
};
