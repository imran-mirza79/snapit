import React, { useContext, useState } from "react";
import { Grow, Container, Grid, Paper } from "@mui/material";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Paginate";
import SearchBox from "./SearchBox";


import PostContext from "../../context/PostContext";

import { useNavigate, useLocation } from "react-router-dom";


import "./styles.css";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Home = () => {
	const { posts } = useContext(PostContext);
	const navigate = useNavigate();

	const query = useQuery();
	const page = query.get('page') || 1;
	const searchQuery = query.get('searchQuery');
	const [ search, setSearch ] = useState('');
	const [ tags, setTags ] = useState([]);


	return (
		<Grow in>
			<Container maxWidth="xl">
				<Grid container justify="space-between" alignItems="stretch" spacing={3} className='gridContainer'>
					<Grid item xs={12} sm={6} md={9}>
						<Posts />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<SearchBox search={search} setSearch={setSearch} tags={tags} setTags={setTags} />
						<Form />
						{(!searchQuery && !tags.length) && (
							<Paper className='pagination' elevation={6}>
								<Paginate page={page} />
							</Paper>
						)}
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
