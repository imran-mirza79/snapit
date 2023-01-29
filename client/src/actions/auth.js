import * as api from "../api";

export const signUp = async (data, navigate) => {
	try {
		const { data: response } = await api.signUp(data);
        navigate("/");
        return response;
	} catch (error) {
		console.log(error);
	}
};

export const signIn = async (data, navigate) => {
	try {
		const { data: response } = await api.signIn(data);
        navigate("/");
        return response;
	} catch (error) {
		console.log(error);
	}
};

export const googleSignin = async (data, navigate) => {
	try {
		const { data: response } = await api.googleSignIn(data);
		navigate("/");
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const googleSignup = async (data, navigate) => {
	try {
		const { data: response } = await api.googleSignUp(data);
		navigate("/");
		return response;
	} catch (error) {
		console.log(error);
	}
};

