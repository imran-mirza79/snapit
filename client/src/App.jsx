import React from "react";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Container } from "@mui/material";
import "./styles.css";
import Error from "./components/Error/Error";

const App = () => {
	return (
		<BrowserRouter>
			<Container maxwidth="xl">
				<NavBar />
				<Routes>
					<Route path="/" exact element={() => <Navigate to='/posts' replace />} />
					<Route path="/posts" exact element={<Home />} />
					<Route path="/posts/search" exact element={<Home />} />
					<Route path="/posts/:id" exact element={<PostDetails />} />
					<Route path="/auth" exact element={<Auth />} />
					<Route path="/error" exact element={<Error/>}/>
				</Routes>
			</Container>
		</BrowserRouter>
	);
};

export default App;
