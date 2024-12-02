import data from "../../data.json" assert { type: "json" };
const users = data.users; 

export const Participant = {
    user: (parent, args) => {
      return users.find((user) => user.id === parent.user_id);
    },
  };