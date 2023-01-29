import { createContext, useState } from "react";

const PostContext = createContext();

export function PostProvider({ children }) {
    const [ posts, setPosts ] = useState([]);
    const [ likeCount, setLikeCount ] = useState(0);
    return (
        <PostContext.Provider value={{ posts, setPosts, likeCount, setLikeCount }}>{children}</PostContext.Provider>
    )
}


export default PostContext;