import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PostProvider } from "../src/context/PostContext";
import { IdProvider } from "./context/IdContext";
import { DeleteProvider } from "./context/DeletedPostContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<IdProvider>
		<DeleteProvider>
			<PostProvider>
				<App />
			</PostProvider>
		</DeleteProvider>
	</IdProvider>
);
