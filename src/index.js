import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './css/main.css';
import './css/modal.css';
import './css/nav.css';
import axios from 'axios';

axios.defaults.baseURL = 'https://avaroots.io:8000'; // use this to run on EC2
axios.defaults.timeout = 10000;
  // if a token is detected, set the authorization and attempt to validate it against the server
if(window.localStorage.getItem("token")) {
  axios.defaults.headers.common.Authorization = `${window.localStorage.getItem("token")}`;
  console.log("IS TOKEN ON LOAD!")
} else {
  console.log("NO TOKEN ON LOAD!")
}

/*
OVERALL FILE PURPOSE: 
Renders application.
See App.js
*/

ReactDOM.render(
  <React.StrictMode>
      <App className={"App"}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
