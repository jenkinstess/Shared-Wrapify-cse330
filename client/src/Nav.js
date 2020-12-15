import React from 'react';
import './App.css';
import ThreeDotsWave from './threeDotsWave';
import {link} from 'react-router-dom';


function Nav() {
    return (
       <nav> 
           <ul className="nav-links"> 
                <li>Home</li>
                <li>My Insights</li>
                <li>Shared Insights</li>

            </ul>
       </nav>
    );
}

export default Nav
