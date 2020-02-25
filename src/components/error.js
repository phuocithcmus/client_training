import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../images/PageNotFound.png';
const NotFound = () => (
    <div>
        <img src={PageNotFound} style={{ width: '50%', height: '100%', display: 'block', margin: 'auto', position: 'relative' }} />
        <center><Link to="/home">Return to Home Page</Link></center>
    </div>
);

export default NotFound;