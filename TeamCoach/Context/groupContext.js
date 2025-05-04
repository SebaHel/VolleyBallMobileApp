import createDataContext from "./createDataContext";
import axios from "axios";
import { GET_GROUPS_URL, CREATE_GROUP_URL } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const groupReducer = (state, action) => {
  switch (action.type) {
    case "fetchGroups":
      return { ...state, groups: action.payload };

    case "createGroup":
      return { state };
    default:
      return state;
  }
};

const fetchGroups = (dispatch) => {
  return async ({ router }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("You must be loged in.");
        return;
      }
      const response = await axios.post(`${GET_GROUPS_URL}`, {
        token,
      });
      dispatch({ type: "fetchGroups", payload: response.data.userGroups });
    } catch (err) {
      console.log("Error fetching groups:", err);
    }
  };
};

const createGroup = (dispach) => {
  return async ({ groupName, selectedColor }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(`${CREATE_GROUP_URL}`, {
        token,
        groupName,
        selectedColor,
      });
      dispach({ type: "CreateGroup" });
      router.back();
    } catch (err) {
      console.log(err);
    }
  };
};

const initialstate = {
  groups: [],
};
export const { Provider, Context } = createDataContext(
  groupReducer,
  { fetchGroups, createGroup },
  initialstate
);
