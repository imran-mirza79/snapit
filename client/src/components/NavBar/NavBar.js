import React from 'react';
import { AppBar } from '@mui/material';
import snap from "../../images/snapInverted.png";
import './styles.css'

const NavBar = () => {
    return (
			<AppBar className="appBar" position="static" color="inherit">
				<img className="image" src={snap} alt="memories" height="50" />
			</AppBar>
	);
};

export default NavBar;