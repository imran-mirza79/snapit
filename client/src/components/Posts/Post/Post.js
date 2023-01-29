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
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
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
	const { setPosts, posts, setLikeCount } = useContext(PostContext);
	const user = JSON.parse(localStorage.getItem('user'))

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
		// e.preventDefault();
		likePost(post._id).then(() => {
			setLikeCount(() => post?.likes.length);
		})
	}


	const Likes = () => {
		if (post.likes.length > 0) {
			return post.likes.find(
				(like) => like === (user?.data?.googleId || user?.data?._id)
			) ? (
				<React.Fragment>
					<ThumbUpIcon fontSize="small" />
					&nbsp;
					{post.likes.length > 2
						? `You and ${post.likes.length - 1} others`
						: `${post.likes.length} ${
								post.likes.length > 1 ? " Likes" : " Like"
						  }`}
				</React.Fragment>
			) : (
				<React.Fragment>
					<ThumbUpAltOutlinedIcon fontSize="small" />
					&nbsp; {post.likes.length} &nbsp;
					{post.likes.length === 1 ? "Like" : "Likes"}
				</React.Fragment>
			);
		}
		return (
			<React.Fragment>
				<ThumbUpAltOutlinedIcon fontSize="small" />
				&nbsp;Like
			</React.Fragment>
		);
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
					{post.name}
				</Typography>
				<Typography variant="body2">
					{moment(post.createdAt).fromNow()}
				</Typography>
			</div>
			{(user?.data?.googleId === post?.creator ||
				user?.data?._id === post?.creator) && (
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
				)}
			<div className="details">
				<Typography variant="body2" color="textSecondary">
					{post.tags.map((tag) => `#${tag} `)}
				</Typography>
			</div>
			<CardContent>
				<Typography variant="h4" className="title" gutterBottom>
					{post.title}
				</Typography>

				<Typography variant="h5" component="p" fontSize="small">
					{post.message}
				</Typography>
			</CardContent>
			<CardActions className="cardActions">
				<Button
					size="small"
					color="primary"
					onClick={handleLike}
					className="likeClass"
					disabled={!user?.data}
				>
					<Likes />
				</Button>
				{(user?.data?.googleId === post?.creator ||
					user?.data?._id === post?.creator) && (
					<Button
						size="small"
						color="primary"
						onClick={handleDelete}
						className="deleteClass"
					>
						<DeleteIcon fontSize="small" />
						Delete
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

export default Post;
