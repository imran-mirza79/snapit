import * as api from '../api';

export const getPosts = async () => {
    try {
        const { data: posts } = await api.fetchPosts();
        return posts;
       
    } catch (error) {
        console.log(error.message);
    }
};

export const createPost = async (post) => {
    try {
        const response = await api.createPost(post);
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.log(error.message);
    }
};

export const updatePost = async (post_id, post) => {
    try {
        const { data: updatedPost } = await api.updatePost(post_id, post);
        return updatedPost;
    } catch (error) {
        console.log(error.message);
    }
};

export const deletePost = async (id) => {
    try {
        await api.deletePost(id);
        return id;
    } catch (error) {
        console.log(error);
    }
};

export const likePost = async (id) => {
    try {
        const { data: updatedPost } = await api.likePost(id);
        return updatedPost;
    } catch (error) {
        console.log(error);
    }
}