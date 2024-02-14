import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostApi } from "src/store/features/postSlice";
import Post from "../post/Post";

const QueryExample = () => {
  const dispatch = useDispatch();

  const { posts, loading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPostApi());
  }, []);

  return (
    <div>
      <h1>Post</h1>
      {loading && <div>Loading...</div>}
      <Grid container spacing={2}>
        {posts &&
          posts?.map((post) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Post post={post} />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default QueryExample;
