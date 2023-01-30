import axios from "axios";

const API = axios.create({
	baseURL: "http://localhost:5000",
});

const GOOGLE_API_USER_DATA_URL =
	"https://www.googleapis.com/oauth2/v3/userinfo?access_token=";

API.interceptors.request.use((req) => {
	if (localStorage.getItem("user")) {
		req.headers.Authorization = `Bearer ${ JSON.parse(localStorage.getItem('user')).token
			}`;
	}
	return req;
});

// USER CALLS
export const getUserData = (access_token) =>
	axios.get(`${ GOOGLE_API_USER_DATA_URL }${ access_token }`);

// MESSSAGE CALLS
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${ searchQuery.search || 'none' }&tags=${ searchQuery.tags }`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (postId, post) => API.patch(`/posts/${ postId }`, post);
export const deletePost = (id) => API.delete(`/posts/${ id }`);
export const likePost = (id) => API.patch(`/posts/${ id }/likePost`);

// AUTH CALLS
export const signUp = (data) => API.post(`/users/signup`, data);
export const signIn = (data) => API.post("/users/signin", data);
export const googleSignIn = (data) => API.post('/users/googlesignin', data);
export const googleSignUp = (data) => API.post("/users/googlesignup", data);
