import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import "./styles.css";
import FileBase from "react-file-base64";
import IdContext from "../../context/IdContext";
import PostContext from "../../context/PostContext";
import { createPost, updatePost } from "../../actions/posts";

const Form = () => {
	const [postData, setPostData] = useState({
		creator: "",
		title: "",
		message: "",
		tags: "",
		selectedFile: "",
	});
	const { currentId, setCurrentId } = useContext(IdContext);
	const { posts } = useContext(PostContext);
	const post = currentId ? posts.find((p) => p._id === currentId) : null;

	useEffect(() => {
		if (post) setPostData(post);
	}, [post]);

	const clear = (e) => {
		setCurrentId(null);
		setPostData({
			creator: "",
			title: "",
			message: "",
			tags: "",
			selectedFile: "",
		});
	};
	const handleSubmit = (e) => {
		// e.preventDefault();
		if (currentId) {
			updatePost(currentId, postData);
		} else {
			createPost(postData);
		}
		clear();
	};

	return (
		<Paper className="paper">
			<form
				autoComplete="off"
				noValidate
				className="root form"
				onSubmit={handleSubmit}
			>
				<Typography variant="h6" className="formHeading">
					{currentId ? "Editing" : "Creating"} a Memory
				</Typography>
				<TextField
					className="root"
					name="creator"
					variant="outlined"
					label="Creator"
					fullWidth
					value={postData.creator}
					onChange={(e) =>
						setPostData({ ...postData, creator: e.target.value })
					}
				/>

				<TextField
					className="root"
					name="title"
					variant="outlined"
					label="Title"
					fullWidth
					value={postData.title}
					onChange={(e) =>
						setPostData({ ...postData, title: e.target.value })
					}
				/>

				<TextField
					className="root"
					name="message"
					variant="outlined"
					label="Message"
					fullWidth
					value={postData.message}
					onChange={(e) =>
						setPostData({ ...postData, message: e.target.value })
					}
				/>

				<TextField
					className="root"
					name="tags"
					variant="outlined"
					label="Tags"
					fullWidth
					value={postData.tags}
					onChange={(e) =>
						setPostData({ ...postData, tags: e.target.value.split(',') })
					}
				/>
				<div className="fileInput">
					<FileBase
						type="file"
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>
				</div>

				<Button
					className="buttonSubmit"
					variant="contained"
					color="secondary"
					size="large"
					type="submit"
					fullWidth
				>
					Submit
				</Button>
				<Button
					className="buttonClear"
					variant="contained"
					color="primary"
					size="small"
					fullWidth
					onClick={clear}
				>
					clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
