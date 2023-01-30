import React, { useEffect, useContext } from 'react';
import { Pagination, PaginationItem, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import PostContext from '../context/PostContext';
import DeleteContext from '../context/DeletedPostContext';
import IdContext from '../context/IdContext';
import { getPosts } from '../actions/posts';
import './styles.css';
import LoadingContext from '../context/LoadingContext';

const Paginate = ({ page }) => {
    const { setPosts, likeCount, setTotalPages, totalPages } = useContext(PostContext);
    const { currentId } = useContext(IdContext);
    const { id } = useContext(DeleteContext);
    const { setLoadingState } = useContext(LoadingContext);


    useEffect(() => {
        async function fetchData() {
            setLoadingState({ isLoading: true, message: "Fetching Data" });
            let response = await getPosts(page);
            setPosts(response.posts);
            setTotalPages(response.totalPages);
            setLoadingState({ isLoading: false, message: null });
        }
        fetchData();
    }, [page, setPosts, currentId, id, likeCount, setTotalPages, setLoadingState]);

    return (
        <Stack spacing={2}>
            <Pagination
                classes={{ ul: 'ul' }}
                count={totalPages}
                page={Number(page) || 1}
                variant="outlined"
                color='primary'
                defaultPage={1}
                siblingCount={-1}
                boundaryCount={1}
                renderItem={(item) => (<PaginationItem
                    {...item} component={Link} to={`/posts?page=${ item.page }`}
                />)}
            />
        </Stack>
    );
};

export default Paginate;