import React from 'react';
import './style/notFound.css'
import img from './img/404.png'
import {Link} from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='not-found'>
            <img src={img} alt='not found'/>
            <Link to='/' className='not-found-link'>Go to home page</Link>
        </div>
    )
};

export {NotFound};