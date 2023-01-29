import React from "react";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Container } from "@mui/material";
import "./styles.css";
import Error from "./components/Error/Error";

const App = () => {
	return (
		<BrowserRouter>
			<Container maxwidth="lg">
				<NavBar />
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/auth" exact element={<Auth />} />
					<Route path="/error" exact element={<Error/>}/>
				</Routes>
			</Container>
		</BrowserRouter>
	);
};

export default App;
