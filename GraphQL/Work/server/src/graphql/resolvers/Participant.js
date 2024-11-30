import data from "../../data.json" assert { type: "json" };
const users = data.users; // users listesini tanımlayın

export const Participant = {
    user: (parent, args) => {
      return users.find((user) => user.id === parent.user_id);
    },
  };