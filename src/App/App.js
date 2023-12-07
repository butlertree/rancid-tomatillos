import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import './App.css';
import Movies from '../Movies/Movies';
import { Routes, Route, NavLink, } from 'react-router-dom';
import ImageCard from '../ImageCard/ImageCard';
import MovieCard from '../MovieCard/MovieCard';
import NotFound from '../NotFound/NotFound';



function App() {

  // State to manage the selected card
  const [selectedCard, setSelectedCard] = useState(null);

  // State to store the list of sightings
  const [movies, setMovies] = useState([]);

  //State for error handling
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies/')
      .then(response => response.json())
      .then(data => setMovies(data.movies))
      .catch(error => setError(error.message))
  }, []);
  
  
  return (
    <main className='App'>
      <h1 className='bigHeading'>Rancid Tomatillos</h1>
      <Routes>
        <Route
          path="/"
          element={<Movies movies={movies} />}
        />
        <Route
          path="/movie/:id" 
          element={<MovieCard />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
      {error && <h2>Something went wrong, please try again later!</h2>}
    </main>
  );

}

export default App;


