import data from "../../data.json" assert { type: "json" };

let events = data.events;

export const User = {
  events: (parent, args) => {
    const events = events.find((event) => event.user_id === parent.id);
    return events;
  },
};
