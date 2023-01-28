import React from 'react';
import { AppBar, Button, Link } from '@mui/material';
// import { Link } from 'react-router-dom';
import snap from "../../images/snapInverted.png";
import './styles.css'

const NavBar = () => {
    return (
		<AppBar className="appBar" position="static" color="inherit">
			<Link href="/">
				<img className="image" src={snap} alt="memories" height="50" />
			</Link>
			<Button></Button>
		</AppBar>
	);
};

export default NavBar;