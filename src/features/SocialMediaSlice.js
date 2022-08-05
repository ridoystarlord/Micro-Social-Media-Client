import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseURL } from "../config";

const initialState = {
  loading: false,
  error: "",
  posts: [],
};

export const getServerPosts = createAsyncThunk("posts/getposts", async () => {
  const response = await axios({
    method: "POST",
    url: `${apiBaseURL}/social-media/get-all`,
    headers: {
      "content-type": "application/json",
    },
  });
  return response.data.results;
});

export const socialMediaSlice = createSlice({
  name: "socialmedia",
  initialState,
  reducers: {
    setAllPost: (state, action) => {
      state.posts = action.payload.posts;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getServerPosts.pending, (state, action) => {
      state.loading = true;
      // state.posts = [];
      // state.error = "";
    });
    builder.addCase(getServerPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      // state.error = "";
    });
    builder.addCase(getServerPosts.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.error.message;
    });
  },
});

export const { setAllPost } = socialMediaSlice.actions;

export const allPosts = (state) => state.posts.posts;

export default socialMediaSlice.reducer;
