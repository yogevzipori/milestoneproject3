import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Login from "./components/LogIn";
import ViewWorkout from "./components/ViewWorkout";
import FilterWorkout from "./components/FilterWorkout";
import AddWorkout from "./components/AddWorkout";
import EditWorkout from "./components/EditWorkout";
import DeleteWorkout from "./components/DeleteWorkout";
import Signup from './components/Signup';
import CurrentUserProvider from './contexts/CurrentUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CurrentUserProvider>;
    <Router>;
      <NavBar/>;
      <Routes>;
        <Route path="/" element={<Login/>}/>;
        <Route path="/signup" element={<Signup/>}/>;
        <Route path="/view" element={<ViewWorkout/>}/>;
        <Route path="/filter" element={<FilterWorkout/>}/>;
        <Route path="/add" element={<AddWorkout/>}/>;
        <Route path="/edit" element={<EditWorkout/>}/>;
        <Route path="/delete" element={<DeleteWorkout/>}/>;
      </Routes>;
    </Router>;
  </CurrentUserProvider>
);