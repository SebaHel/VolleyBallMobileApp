import createDataContext from "./createDataContext";
import axios from "axios";
import { GET_GROUPS_URL } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const groupReducer = (state, action) => {
  switch (action.type) {
    case "fetchGroups":
      return { ...state, groups: action.payload };
    default:
      return state;
  }
};

const fetchGroups = (dispatch) => {
  return async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("Brak tokenu użytkownika.");
        return;
      }
      const response = await axios.post(`${GET_GROUPS_URL}`, {
        token,
      });
      console.log(response.data.userGroups);

      dispatch({ type: "fetchGroups", payload: response.data.userGroups });
    } catch (err) {
      console.log("Error fetching groups:", err);
    }
  };
};

const initialstate = {
  groups: [],
};
export const { Provider, Context } = createDataContext(
  groupReducer,
  { fetchGroups },
  initialstate
);
