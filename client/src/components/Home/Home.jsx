import React, { useContext, useEffect, useState } from "react";
import { Grow, Container, Grid, Paper } from "@mui/material";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Paginate";
import SearchBox from "./SearchBox";

import IdContext from "../../context/IdContext";
import DeleteContext from "../../context/DeletedPostContext";
import PostContext from "../../context/PostContext";

import { useNavigate, useLocation } from "react-router-dom";

import { getPosts } from "../../actions/posts";

import "./styles.css";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}




const Home = () => {
	const { setPosts, posts, likeCount } = useContext(PostContext);
	const { currentId } = useContext(IdContext);
	const { id } = useContext(DeleteContext);
	const navigate = useNavigate();

	const query = useQuery();
	const page = query.get('page') || 1;
	const searchQuery = query.get('searchQuery');
	const [ search, setSearch ] = useState('');
	const [ tags, setTags ] = useState([]);




	useEffect(() => {
		getPosts().then((data) => {
			setPosts(data);
		});
	}, [ setPosts, currentId, id, likeCount ]);



	return !posts ? (
		navigate('/error')
	) : (
		<Grow in>
			<Container maxWidth="xl">
				<Grid container justify="space-between" alignItems="stretch" spacing={3}>
					<Grid item xs={12} sm={6} md={9}>
						<Posts/>
					</Grid>
					<Grid item xs={12} sm={6} md={3} className='gridContainer2'>
							<SearchBox search={search} setSearch={ setSearch} tags={tags} setTags={setTags} />
						<Form/>
						{(!searchQuery && !tags.length) && (
							<Paper className='pagination' elevation={6}>
								<Paginate/>
							</Paper>
						)}
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
