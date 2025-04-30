import createDataContext from "./createDataContext";
import axios from "axios";
import { DELETE_NOTIFICATION_URL, GET_NOTIFICATIONS_URL } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "fetchNotifications":
      return { ...state, notifications: action.payload };
    case "deleteNotification":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };
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

const deleteNotification = (dispatch) => {
  return async ({ id }) => {
    await axios.delete(`${DELETE_NOTIFICATION_URL}`, { data: { id } });
    dispatch({
      type: "deleteNotification",
    });
  };
};

const initialstate = {
  notifications: [],
};

export const { Provider, Context } = createDataContext(
  notificationReducer,
  { fetchNotification, deleteNotification },
  initialstate
);
