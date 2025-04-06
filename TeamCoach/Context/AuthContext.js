import createDataContext from "./createDataContext";
import axios from "axios";
import { CREATE_USER_URL } from "@/config";

const authReducer = (state, action) => {
  switch (action.type) {
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
    console.log(response.data.token);
  };
};

const signin = (dispatch) => {};

export const { Provider, Context } = createDataContext(authReducer, {
  signup,
  signin,
});
