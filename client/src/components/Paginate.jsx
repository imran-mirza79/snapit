import React from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';
import './styles.css'

const Paginate = () => {
    return (
        <Pagination classes={{ ul: 'ul' }}
            count={3}
            page={1}
            variant="outlined"
            color='primary'
            renderItem={(item) => (<PaginationItem
                {...item} component={Link} to={`/posts?page=${1}`}
            />)}
        />
    );
};

export default Paginate;