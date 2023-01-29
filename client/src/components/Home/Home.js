import React, { useContext, useEffect } from "react";
import { Grow, Container, Grid } from "@mui/material";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import IdContext from "../../context/IdContext";
import DeleteContext from "../../context/DeletedPostContext";
import PostContext from "../../context/PostContext";
import { getPosts } from "../../actions/posts";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const { setPosts, posts, likeCount } = useContext(PostContext);
	const { currentId } = useContext(IdContext);
	const { id } = useContext(DeleteContext);
	const navigate = useNavigate();
	useEffect(() => {
		getPosts().then((data) => {
			setPosts(data);
		});
	}, [setPosts, currentId, id, likeCount]);

	return !posts ? (
		navigate('/error')
	) : (
		<Grow in>
			<Container>
				<Grid
					container
					justifyContent="space-between"
					alignItems="stretch"
					className="reverseFlex"
					// flexDirection="column-reverse"
				>
					<Grid item xs={12} sm={7} className="PostFormContainer">
						<Posts />
					</Grid>

					<Grid item xs={12} sm={4} className="PostFormContainer">
						<Form />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
