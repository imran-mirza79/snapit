import React, { useState, useContext } from "react";
import {
	Container,
	Paper,
	Avatar,
	Typography,
	Grid,
	Button,
	Divider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import GoogleOAuth from "./GoogleOAuth";
import "./styles.css";
import { signIn, signUp } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const Auth = () => {
	const [isSignUp, setSignUp] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [ userData, setUserData ] = useState(initialState);
	const navigate = useNavigate();
	const { setUser } = useContext(UserContext);

	const handleSumbit = async (e) => {
		e.preventDefault();
		// console.log(isSignUp)
		if (isSignUp) {
			let response = await signUp(userData, navigate);
			setUser({ data: response.result, token: response.token });
			localStorage.setItem(
				"user",
				JSON.stringify({ data: response.result, token: response.token })
			);
		} else {
			let response = await signIn(userData, navigate);
			setUser({ data: response.result, token: response.token });
			localStorage.setItem(
				"user",
				JSON.stringify({ data: response.result, token: response.token })
			);
		}
		
	};

	const handleChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const handleShowPassword = (e) => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};
	const switchMode = (e) => {
		setSignUp((prevState) => !prevState);
		setShowPassword(false);
	};

	return (
		<Container component="main" maxWidth="xs">
			<Paper className="paper" elevation={3}>
				<Avatar className="avatar">
					<LockOutlinedIcon className="lockIcon" />
				</Avatar>

				<Typography variant="h5">
					{isSignUp ? "Sign Up" : "Sign In"}
				</Typography>
				<form
					className="form"
					autoComplete="off"
					onSubmit={handleSumbit}
				>
					<Grid container spacing={2}>
						{isSignUp && (
							<React.Fragment>
								<Input
									name="firstName"
									label="First Name"
									handleChange={handleChange}
									autoFocus
									half
								/>
								<Input
									name="lastName"
									label="Last Name"
									handleChange={handleChange}
									half
								/>
							</React.Fragment>
						)}

						<Input
							name="email"
							label="Email Address"
							handleChange={handleChange}
							type="email"
							autoFocus={isSignUp ? false : true}
						/>

						<Input
							name="password"
							label="Password"
							handleChange={handleChange}
							type={showPassword ? "text" : "password"}
							handleShowPassword={handleShowPassword}
						/>
						{isSignUp && (
							<Input
								name="confirmPassword"
								label="Repeat Password"
								handleChange={handleChange}
								type="password"
								handleShowPassword={handleShowPassword}
							/>
						)}

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className="submit"
						>
							{isSignUp ? "Sign Up" : "Sign In"}
						</Button>
						<Divider
							style={{ width: "100%", height: "2px" }}
							textAlign="center"
						>
							<Typography
								variant="body2"
								sx={{
									display: "flex",
									tifyContent: "center",
									width: "100%",
									height: "100%",
									alignItems: "center",
								}}
							>
								OR
							</Typography>
						</Divider>
					</Grid>

					<GoogleOAuth isSignUp={isSignUp} />
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Button onClick={switchMode}>
								{isSignUp
									? "Already Have an Account? SIgn In"
									: "Don't Have an Account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
