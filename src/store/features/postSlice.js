import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPosts } from "src/utils/api";
export const getPostApi = createAsyncThunk("posts", async () => {
  try {
    const { data } = await getPosts();
    return { data };
  } catch (error) {
    // you can create util functon to handle errors.
    return Promise.reject(error);
  }
});

const initialState = { posts: [], loading: false, error: "" };
export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPostApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPostApi.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload.data;
      state.error = "";
    });
    builder.addCase(getPostApi.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.error.message;
    });
  },
});
export default postSlice.reducer;
