import React from 'react';
import Box from '@material-ui/core/Box';
import {newsList} from '../news/newsList'
import { v4 as uuidv4 } from 'uuid';
import './newsItem.css';
/**
* @component
* Μία είδηση του οργανισμού
* @return JSX
*/
const NewsItem = () => {
    let path = window.location.pathname;
    let id = path.split("/")[2]
    return (
        <Box>
           {newsList
           .filter(n => n.id === id)
           .map(n => {
               return (
                <div className="container-fluid" key={uuidv4()}>
                    <div className="row">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-8">
                            <h1 className="news-item-heading p-2">{n.title}</h1>
                            <img src={n.image} className="news-item-img rounded" alt={n.title}/>
                            <p className="paragraph p-3">{n.content}</p>
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                </div>
               )
           })} 
        </Box>
    )
}

export default NewsItem;