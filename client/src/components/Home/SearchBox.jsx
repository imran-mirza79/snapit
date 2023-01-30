import React, { useContext } from 'react';
import { AppBar, TextField, Button } from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input';
import { getPostBySearch } from '../../actions/posts';
import PostContext from '../../context/PostContext'
import LoadingContext  from '../../context/LoadingContext'
import Loading from '../Loading/Loading'
import {  useNavigate } from 'react-router-dom';



const SearchBox = ({search, setTags, tags, setSearch}) => {
    const navigate = useNavigate();
    
    const { setPosts } = useContext(PostContext);
    const { loadingState, setLoadingState } = useContext(LoadingContext);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            //search for the post
            console.log(e.target.value);
        }
    };

    const handleAdd = (tag) => setTags(tag);

    const searchPost = async (e) => {

        if (search.trim() || tags) {
            setLoadingState({ isLoading: true, message: "Searching..." });
            <Loading loading={loadingState.isLoading} message={loadingState.message}/>
            const  response = await getPostBySearch({ search: search, tags: tags.join(',') })
            navigate(`/posts/search?searchQuery=${ search || 'none' }&tags=${ tags }`)
            setPosts(response);
            setLoadingState({ isLoading: false, message: null });
        } else {
            navigate('/posts');
        }
    };

    return (
        <AppBar className='appBarSearch' position="static" color='inherit'>
            <TextField
                name='search'
                variant="outlined"
                label='Search Memories'
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <MuiChipsInput
                style={{ margin: '10px 0', width: '18rem !important' }}
                helperText={tags.length > 0 ? "Double click to edit a chip" : ""}
                clearInputOnBlur
                value={tags}
                onChange={handleAdd}
                label={"Search Tags"}
            />
            <Button onClick={searchPost} className='searchButton' color='primary' fullWidth variant="contained">Search</Button>
        </AppBar>
    );
};

export default SearchBox;