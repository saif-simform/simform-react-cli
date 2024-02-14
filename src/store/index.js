import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "src/store/features/counterSlice";
import postSlice from "./features/postSlice";
import authSlice from "./features/authSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    post: postSlice,
    auth: authSlice
  },
});
