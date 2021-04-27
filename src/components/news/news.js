import React from 'react';
import Box from '@material-ui/core/Box';
import {NewsList} from '../home/home';
import './news.css';

const News = () => {
    
    return (
        <Box>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8 mt-5 mb-5">
                        <NewsList />
                    </div>
                    <div className="col-sm-2"></div>
                </div>
            </div>
        </Box>
    )
}

export default News;