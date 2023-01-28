import { createContext, useState } from "react";

const PostContext = createContext();

export function PostProvider({ children }) {
    const [ posts, setPosts ] = useState([]);
    return (
        <PostContext.Provider value={{ posts, setPosts }}>{children}</PostContext.Provider>
    )
}


export default PostContext;