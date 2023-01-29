import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
	const { email, password } = req.body;
	console.log(email, password);
	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			res.status(404), json({ message: "User doesn't exist" });
		}
		const isPasswordCorret = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordCorret) {
			res.status(400).json({ message: "Invalid Credentials" });
		}

		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			"test",
			{ expiresIn: "1hr" }
		);
		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

export const signup = async (req, res) => {
	const { firstName, lastName, email, password, confirmPassword } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser)
			res.status(400).json({ message: "User already exist" });
		if (password !== confirmPassword)
			return res.status(400).json({ message: "Passwords doesnt match" });

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await User.create({
			email,
			password: hashedPassword,
			name: firstName + " "+lastName,
		});
		const token = jwt.sign(
			{ email: result.email, id: result._id },
			"test",
			{ expiresIn: "1hr" }
		);

		res.status(200).json({ result: result, token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

export const googleSignin = async (req, res) => {
	const { email } = req.body;
	console.log(req.body);
	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			res.status(404), json({ message: "User doesn't exist" });
		}

		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			"test",
			{ expiresIn: "1hr" }
		);
		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};


export const googleSignup = async (req, res) => {
	const { given_name:name, family_name:familyname, email  } = req.body;

	try {
		const existingUser = await User.findOne({ email }); 
		if (existingUser)
			res.status(400).json({ message: "User already exist" });

		const result = await User.create({
			email,
			password: '',
			name: name + " " + familyname,
			authType:'google'
		});
		console.log(result)
		const token = jwt.sign(
			{ email: result.email, id: result._id },
			"test",
			{ expiresIn: "1hr" }
		);

		res.status(200).json({ result: result, token });
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Something went wrong" });
	}
};
