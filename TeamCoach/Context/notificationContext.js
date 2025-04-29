import createDataContext from "./createDataContext";
import axios from "axios";
import { GET_NOTIFICATIONS_URL } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "fetchNotifications":
      return { ...state, notifications: action.payload };
    default:
      return state;
  }
};

const fetchNotification = (dispatch) => {
  return async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("You must be loged in.");
        return;
      }
      const response = await axios.post(`${GET_NOTIFICATIONS_URL}`, {
        token,
      });
      dispatch({
        type: "fetchNotifications",
        payload: response.data.userNotifications,
      });
    } catch (err) {
      console.log("Error fetching groups:", err);
    }
  };
};

const initialstate = {
  notifications: [],
};

export const { Provider, Context } = createDataContext(
  notificationReducer,
  { fetchNotification },
  initialstate
);
