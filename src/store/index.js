import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "src/store/features/counterSlice";
import postSlice from "./features/postSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    post: postSlice,
  },
});
