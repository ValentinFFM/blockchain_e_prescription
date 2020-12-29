// Default react imports 
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './app/serviceWorker';

// Importing Bootstrap for styling
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './app/app'

ReactDOM.render((<App />), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
