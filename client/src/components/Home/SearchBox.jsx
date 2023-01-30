import React, { useState } from 'react';
import { AppBar, TextField, Button } from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input';
import { getPostBySearch } from '../../actions/posts';

import { useLocation, useNavigate } from 'react-router-dom';



const SearchBox = ({search, setTags, tags, setSearch}) => {
    const navigate = useNavigate();
    


    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            //search for the post
            console.log(e.target.value);
        }
    };

    const handleAdd = (tag) => setTags(tag);

    const searchPost = (e) => {

        if (search.trim()) {
            getPostBySearch({ search: search, tags: tags.join(',') }).then((data) => {
                console.log(data);
            });
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