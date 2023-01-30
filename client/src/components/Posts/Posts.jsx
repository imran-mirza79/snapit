import React, { useContext } from "react";
import { Grid, CircularProgress } from "@mui/material";
import Post from "./Post/Post";
import PostContext from "../../context/PostContext";
import './styles.css';

const Posts = () => {
    const { posts } = useContext(PostContext);

    return !posts.length ? <CircularProgress /> : (
        <Grid className='container' container alignItems="stretch" spacing={3}>
            {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6} md={6}>
                    <Post post={post} key={post._id} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;