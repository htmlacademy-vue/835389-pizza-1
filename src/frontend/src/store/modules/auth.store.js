import users from "../../static/user.json";

export default {
  namespaced: true,
  state: {
    user: users[0],
  },
};
