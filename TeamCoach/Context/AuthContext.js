import createDataContext from "./createDataContext";
import { useRouter } from "expo-router";
import axios from "axios";
import { CREATE_USER_URL, SIGN_IN_USER_URL } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const router = useRouter();

const authReducer = (state, action) => {
  switch (action.type) {
    case "signup":
      return { ...state, token: action.payload };
    case "signin":
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async ({ email, password, repeatedPassword, ischecked }) => {
    console.log("udało się");
    const response = await axios.post(`${CREATE_USER_URL}`, {
      email,
      password,
      repeatedPassword,
    });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signup", payload: response.data.token });
    router.replace("/(tabs)");
  };
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    const response = await axios.post(`${SIGN_IN_USER_URL}`, {
      email,
      password,
    });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signup", payload: response.data.token });
    router.replace("/(tabs)");
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signup,
    signin,
  },
  { token: null }
);
