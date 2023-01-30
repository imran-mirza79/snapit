import React, { useContext } from "react";
import { Grid } from "@mui/material";
import Post from "./Post/Post";
import PostContext from "../../context/PostContext";
import Loading from "../Loading/Loading";
import LoadingContext from '../../context/LoadingContext';
import './styles.css';

const Posts = () => {
    const { posts } = useContext(PostContext);

    const { loadingState } = useContext(LoadingContext);


    return !posts?.length ? <Loading loading={loadingState.isLoading} message={loadingState.message} />: (
        <Grid className='container' container alignItems="stretch" spacing={3}>
            {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6} md={6} lg={6}>
                    <Post post={post} key={post._id} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;