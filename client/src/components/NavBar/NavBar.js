import React, {useContext, useEffect} from "react";
import {
	AppBar,
	Avatar,
	Button,
	Toolbar,
	Typography,
} from "@mui/material";
import {NavLink, Link, useNavigate} from 'react-router-dom'
import decode from 'jwt-decode';
import snap from "../../images/snap.png";
import UserContext from "../../context/UserContext";
import "./styles.css";

const NavBar = () => {
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const user = JSON.parse(localStorage.getItem('user'));

	const logout = (e) => {
		e.preventDefault();
		setUser(null);
		localStorage.clear();
		navigate('/');
	}
	
	useEffect(() => {
		const token = user?.token;

		if (token) {
			const decodedToken = decode(token);
			if (decodedToken.exp * 1000 < new Date().getTime()) {
				setUser(null);
				localStorage.clear();
				navigate("/");
			}
		}

		setUser(JSON.parse(localStorage.getItem('user')));
	}, [navigate, setUser, user?.token])

	return (
		<AppBar className="appBar" position="static" color="inherit">
			<Link to="/">
				<img className="image" src={snap} alt="memories" height="50" />
			</Link>
			<Toolbar className="toolbar">
				{user ? (
					<div className="profile">
						<Avatar
							className="profileAvatar"
							alt={user?.data?.name}
							src={user?.data?.picture}
						>
							{user?.data?.name.charAt(0)}
						</Avatar>
						<Typography className="userName" variant="h6">
							{user?.data?.name}
						</Typography>
						<Button
							variant="contained"
							className="logoutButton"
							color="primary"
							onClick={logout}
						>
							LogOut
						</Button>
					</div>
				) : (
					<NavLink to="/auth">
						<Button className="loginButton" variant="contained">
							SignIn
						</Button>
					</NavLink>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
