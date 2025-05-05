import createDataContext from "./createDataContext";
import axios from "axios";
import { CREATE_PROFILE_URL } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const profileReducer = (state, action) => {
  switch (action.type) {
    case "createProfile":
      return { state };
    default:
      return state;
  }
};

const createProfile = (dispatch) => {
  return async ({ name, surname, position, router }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("You must be loged in.");
        return;
      }
      await axios.post(`${CREATE_PROFILE_URL}`, {
        token,
        name,
        surname,
        position,
      });
      dispatch({ type: "createProfile" });
      router.replace("/(tabs)");
    } catch (err) {
      console.log(err);
    }
  };
};

const initialstate = {
  groups: [],
};
export const { Provider, Context } = createDataContext(
  profileReducer,
  { createProfile },
  initialstate
);
