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
import logo from '../../images/memories-Logo.png'
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
		<AppBar className ='appBar'  position = "static" color = "inherit" >
      <Link to="/posts" className='brandContainer'>
        <img component={Link} to="/" src={snap} alt="icon" height="45px" className="image"/>
        <img className={'image'} src={logo} alt="icon" height="40px" />
      </Link>
      <Toolbar className={'toolbar'}>
        {user?.result ? (
          <div className={'profile'}>
            <Avatar className={'purple'} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={'userName'} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={'logout'} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary" className='loginButton'>Sign In</Button>
        )}
      </Toolbar>
    </AppBar >
	);
};

export default NavBar;
