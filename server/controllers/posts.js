import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
	const { page } = req.query;
	try {
		const LIMIT = 4;
		const startIndex = (Number(page) - 1) * LIMIT; // startIndex of every page
		const total = await PostMessage.countDocuments({}); // get total Docs
		const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
		res.status(200).json({data:posts, currentPage:Number(page), totalPages:Math.ceil(total/LIMIT)});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {
	const post = req.body;
	const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
	try {
		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updatePost = async (req, res) => {
	const _id = req.params.id;
	const post = req.body;
	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send("No post with this id");
	const updatedPost = await PostMessage.findByIdAndUpdate(
		_id,
		{ ...post, _id },
		{ new: true }
	);
	res.json(updatedPost);
};

export const deletePost = async (req, res) => {
	const id = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send("No post with this id");
	await PostMessage.findByIdAndRemove(id);
	res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
	const id = req.params.id;
	// console.log(typeof req.userId)
	if (!req.userId) return res.json({ message: "Unauthenticated" });

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send("No post with this id");
	const post = await PostMessage.findById(id);
	const index = post.likes.findIndex((id) => id === String(req.userId));

	console.log(index);

	if (index === -1) {
		post.likes.push(req.userId);
	} else {
		post.likes = post.likes.filter((id) => id !== String(req.userId));
	}
	const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
		new: true,
	});
	res.json(updatePost);
};

export const getPostBySearch = async (req, res) => {
	const { searchQuery, tags } = req.query;
	try {
		const title = new RegExp(searchQuery, 'i');
		const post = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ] });
		res.json({ data: post });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};
