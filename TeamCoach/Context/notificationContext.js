import createDataContext from "./createDataContext";
import axios from "axios";

const notificationReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const initialstate = {
  notifications: [],
};

export const { Provider, Context } = createDataContext(
  notificationReducer,
  {},
  initialstate
);
