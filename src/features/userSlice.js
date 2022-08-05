import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseURL } from "../config";

const initialState = {
  name: "",
  email: "",
  _id: "",
  gender: "",
  birthday: null,
  users: [],
  loading: false,
  error: "",
};

export const getServerUsers = createAsyncThunk("users/getusers", async () => {
  const response = await axios({
    method: "POST",
    url: `${apiBaseURL}/social-media/get-all-users`,
    headers: {
      "content-type": "application/json",
    },
  });
  return response.data.results;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoginDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state._id = action.payload._id;
      state.gender = action.payload.gender;
      state.birthday = action.payload.birthday;
    },
    setSignOutState: (state) => {
      state.name = "";
      state.email = "";
      state._id = "";
      state.gender = "";
      state.birthday = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getServerUsers.pending, (state, action) => {
      state.loading = true;
      // state.posts = [];
      // state.error = "";
    });
    builder.addCase(getServerUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      // state.error = "";
    });
    builder.addCase(getServerUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export const { setUserLoginDetails, setSignOutState } = userSlice.actions;

export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserId = (state) => state.user._id;
export const selectUserGender = (state) => state.user.gender;
export const selectUserBirthday = (state) => state.user.birthday;
export const allUsers = (state) => state.user.users;

export default userSlice.reducer;
