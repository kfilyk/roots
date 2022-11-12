// App.js

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {BrowserRouter, HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import NotFoundPage from './components/NotFoundPage';
import Dashboard from './components/Dashboard';
import Experiment from './components/Experiment/Experiment';
import Recipe from './components/Recipe/Recipe';
import Plant from "./components/Plant/Plant";
import Help from './components/Help/Help';
import MQTT from './components/MQTT/MQTT';
import Analysis from './components/Analysis/Analysis';

/*
OVERALL FILE PURPOSE: 
Sets the axios base url then adds routing paths
*/
const App = () => {

  //axios.defaults.baseURL = 'http://127.0.0.1:8000'; // use this to run locally

  /*
  Input from: None
  Outputs to: None
  Created by: Kelvin F 08/29/2022
  Last Edit: Kelvin F 08/29/2022
  Purpose: Sets the base axios url to be used in all axios calls
  */
  useEffect(() => {
    console.log("TOKEN: ", axios.defaults.headers.common.Authorization)
    authenticate_user()
  }, []);

  function authenticate_user() {
    console.log("RUNNING AUTHENTICATE:")
    if (axios.defaults.headers.common.Authorization) {
      console.log("AUTH: ", axios.defaults.headers.common.Authorization)
      axios
        .post("/auth/token/")
        .then((res) => {
          localStorage.setItem('user', res.data.username)
          if(window.location.hash.includes('login')) {
            window.location.replace("/roots/#/experiments")
          }
        })
        .catch(res => { // if token no longer valid
          localStorage.removeItem('token');
          window.location.replace("/roots/#/login")
        });
    }
  }

  // Hash Router Implementation

  return ( 
    
      <HashRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/"} element={<Dashboard/>} >
              <Route path={"experiments"} element={<Experiment/>}/>
              <Route path={"recipes"} element={<Recipe/>}/>
              <Route path={"plants"} element={<Plant/>}/>
              <Route path={"help"} element={<Help/>}/>
              <Route path={"mqtt"} element={<MQTT/>}/>
              <Route path={"analysis"} element={<Analysis/>}/>
            </Route>
            <Route path="*" element={localStorage.getItem('user') ? <Navigate to="/#/experiments" />: <Navigate to="/#/login" />} />
          </Routes>
      </HashRouter>

  )

  // Browser Router Implementation
  /*
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"roots"} element={<Login />}/>
        <Route path={"roots/"+auth} element={<Dashboard user = {auth}/>} >
          <Route path={"experiments"} element={<Experiment/>}/>
          <Route path={"recipes"} element={<Recipe/>}/>
          <Route path={"plants"} element={<Plant/>}/>
          <Route path={"help"} element={<Help/>}/>
          <Route path={"mqtt"} element={<MQTT/>}/>
          <Route path={"analysis"} element={<Analysis/>}/>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  ); 
  */
}

export default App;
