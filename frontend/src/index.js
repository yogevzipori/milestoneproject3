import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from './App';

import NavBar from "./components/NavBar";
import Login from "./components/LogIn";
import ViewWorkout from "./components/workout/ViewWorkout";
import AddWorkout from "./components/workout/AddWorkout";
import EditWorkout from "./components/workout/EditWorkout";
import Signup from './components/Signup';
import Error from "./components/Error"
import CurrentUserProvider from './contexts/CurrentUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className="wrapper">
  <CurrentUserProvider>
    <Router>
      <App/>
      <Routes>
        <Route path="/" element={<ViewWorkout/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/add" element={<AddWorkout/>}/>
        <Route path="/workouts/:id" element={<EditWorkout/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
      <NavBar/>
    </Router>
  </CurrentUserProvider>
  </div>
);