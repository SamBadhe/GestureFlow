import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MoviePage from "./pages/Movies";
import Netflix from "./pages/Netflix";
import Player from "./pages/Player";
import Signup from "./pages/Signup";
import TVShows from "./pages/TVShows";
import UserListedMovies from "./pages/UserListedMovies";
import HandCanvas from "./components/HandCanvas";
import Profile from "./pages/Profile"; 
import Context from './utils/UserContext'; 

export default function App() {
  return (
    <Context> {/* Wrap your entire app with the Context provider */}
      <BrowserRouter>
        <HandCanvas /> {/* Keep your HandCanvas component here */}

        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/player" element={<Player />} />
          <Route exact path="/tv" element={<TVShows />} />
          <Route exact path="/movies" element={<MoviePage />} />
          <Route exact path="/new" element={<Player />} />
          <Route exact path="/mylist" element={<UserListedMovies />} />
          <Route exact path="/profile" element={<Profile />} /> {/* Add Profile route */}
          <Route exact path="/" element={<Netflix />} />
        </Routes>
      </BrowserRouter>
    </Context>
  );
}
