import React from 'react';
import { CircularProgress } from '@mui/material';
import './styles.css';

const Loading = ({ loading, message }) => {
    return loading ? (
        <div className="overlay-content">
            <div className="wrapper">
                <CircularProgress />
                <span className="message">{message}</span>
            </div>
        </div>
    ) : null;
};

export default Loading;