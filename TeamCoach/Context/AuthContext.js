import createDataContext from "./createDataContext";
import axios from "axios";
import { CREATE_USER_URL, SIGN_IN_USER_URL } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authReducer = (state, action) => {
  switch (action.type) {
    case "signup":
      return { ...state, token: action.payload };
    case "signin":
      return { ...state, token: action.payload };
    case "signout":
      return { token: null };
    default:
      return state;
  }
};

const signOut =
  (dispatch) =>
  async ({ router }) => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
    router.replace("/(auth)/signIn");
  };

const LocalSigninValidation =
  (dispatch) =>
  async ({ router }) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "signin", payload: token });
      router.replace("/(tabs)");
    } else {
      router.replace("/(auth)/signIn");
      dispatch({ type: "signin", payload: null });
    }
  };

const signup = (dispatch) => {
  return async ({ email, password, repeatedPassword, ischecked, router }) => {
    const response = await axios.post(`${CREATE_USER_URL}`, {
      email,
      password,
      repeatedPassword,
    });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signup", payload: response.data.token });
    router.replace("/profile");
  };
};

const signin = (dispatch) => {
  return async ({ email, password, router }) => {
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
    signOut,
    LocalSigninValidation,
  },
  { token: null }
);
