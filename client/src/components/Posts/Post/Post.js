import React, { useContext } from "react";
import {
	Card,
	CardContent,
	CardMedia,
	Button,
	Typography,
	CardActions,
} from "@mui/material";
import "./styles.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import road from "../../../images/road.jpg";
import moment from "moment";
import IdContext from "../../../context/IdContext";
import PostContext from "../../../context/PostContext";
import { deletePost, likePost } from "../../../actions/posts";
import DeleteContext from "../../../context/DeletedPostContext";

const Post = ({ post }) => {
	const { setCurrentId } = useContext(IdContext);
	const { setId } = useContext(DeleteContext);
	const { setPosts, posts } = useContext(PostContext);

	const handleDelete = (e) => {
		e.preventDefault();
		deletePost(post._id).then((id) => {
			let updatedPosts = posts.filter((p) => {
				return p._id !== id;
			});
			setPosts(updatedPosts);
			setId(post._id);
		})
	}

	const handleLike = (e) => {
		e.preventDefault();
		likePost(post._id).then((post) => {
			setId(post._id);
		})
	}


	return (
		<Card className="card">
			<CardMedia
				className="media"
				image={post.selectedFile || road}
				title={post.title}
			/>
			<div className="overlay">
				<Typography variant="h6" className="creatorName">
					{post.creator}
				</Typography>
				<Typography variant="body2">
					{moment(post.createdAt).fromNow()}
				</Typography>
			</div>
			<div className="overlay2">
				<Button
					style={{ color: "white" }}
					size="small"
					onClick={() => {
						setCurrentId(post._id);
					}}
				>
					<MoreHorizIcon fontSize="medium" />
				</Button>
			</div>
			<div className="details">
				<Typography variant="body2" color="textSecondary">
					{post.tags.map((tag) => `#${tag} `)}
				</Typography>
			</div>
			<CardContent>
				<Typography variant="h4" className="title" gutterBottom>
					{post.title}
				</Typography>

				<Typography
					variant="h5"
					component="p"
					fontSize="small"
				>
					{post.message}
				</Typography>
			</CardContent>
			<CardActions className="cardActions">
				<Button size="small" color="primary" onClick={handleLike}>
					<ThumbUpIcon fontSize="small" />
					&nbsp;Like&nbsp;
					{post.likeCount}
				</Button>
				<Button size="small" color="primary" onClick={handleDelete}>
					<DeleteIcon fontSize="small" />
					Delete
				</Button>
			</CardActions>
		</Card>
	);
};

export default Post;
