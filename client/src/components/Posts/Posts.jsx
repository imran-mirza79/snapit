import React, { useContext } from "react";
import { Grid, CircularProgress, Typography } from "@mui/material";
import PostContext from "../../context/PostContext";
// import IdContext from "../../context/IdContext";
import Post from "./Post/Post";

const Posts = () => {
	const { posts } = useContext(PostContext);
	if (posts && posts.length===0)
		return <Typography variant="h3">No Memories Available</Typography>;
	return posts && !posts.length ? (
		<CircularProgress />
	) : (
		<Grid className="grid" container alignItems="stretch" spacing={3}>
			{posts.map((post) => (
				<Grid item xs={12} sm={6} key={post._id}>
					<Post post={post} key={post._id} />
				</Grid>
			))}
		</Grid>
	);
};

export default Posts;
