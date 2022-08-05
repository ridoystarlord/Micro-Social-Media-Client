import { configureStore } from "@reduxjs/toolkit";
import socialmediaReducer from "../features/SocialMediaSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    posts: socialmediaReducer,
    user: userReducer,
  },
});
