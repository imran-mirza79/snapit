import * as api from '../api';

export const getPosts = async (page) => {
    try {
       
        const { data: state } = await api.fetchPosts(page);
        return {posts: state.data, currentPage: state.currentPage, totalPages: state.totalPages}
    } catch (error) {
        console.log(error.message);
    }
};

export const getPostBySearch = async (searchQuery) => {
    try {
        const {data:{data}} = await api.fetchPostsBySearch(searchQuery);
        return data;
    } catch (error) {
        console.log(error);
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
};