import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostApi } from "src/store/features/postSlice";

const QueryExample = () => {
  const dispatch = useDispatch();

  const { posts, loading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPostApi());
  }, []);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {posts &&
        posts?.map((post) => {
          return <div key={post.id}>{post.title}</div>;
        })}
    </div>
  );
};

export default QueryExample;
