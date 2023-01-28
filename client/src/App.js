import React, { useContext, useEffect } from "react";
import { Container, AppBar, Grow, Grid } from "@mui/material";
import snap from "./images/snapInverted.png";

import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import "./styles.css";
import { getPosts } from "./actions/posts";
import PostContext from "../src/context/PostContext";
import IdContext from "./context/IdContext";
import DeleteContext from "./context/DeletedPostContext";
import Error from "./components/Error/Error";
import NavBar from "./components/NavBar/NavBar";

const App = () => {
	const { setPosts, posts } = useContext(PostContext);
	const { currentId } = useContext(IdContext);
	const { id } = useContext(DeleteContext);
	useEffect(() => {
		getPosts().then((data) => {
			setPosts(data);
		});
	}, [setPosts, currentId, id]);

	return !posts ? (
		<Error />
	) : (
		<Container maxwidth="lg">
			<NavBar/>
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
		</Container>
	);
};

export default App;
