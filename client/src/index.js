// Default react imports 
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// Imports of all used components 
import Navigation from './navigation'

// Importing Bootstrap for styling
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render([<Navigation />], document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
