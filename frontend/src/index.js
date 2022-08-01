import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Login from "./components/LogIn";
import ViewWorkout from "./components/workout/ViewWorkout";
import AddWorkout from "./components/workout/AddWorkout";
import EditWorkout from "./components/workout/EditWorkout";
import Signup from './components/Signup';
import CurrentUserProvider from './contexts/CurrentUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CurrentUserProvider>
    <Router>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/view" element={<ViewWorkout/>}/>
        <Route path="/add" element={<AddWorkout/>}/>
        <Route path="/edit/:id" element={<EditWorkout/>}/>
      </Routes>
    </Router>
  </CurrentUserProvider>
);