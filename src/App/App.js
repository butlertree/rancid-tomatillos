import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import './App.css';
import Movies from '../Movies/Movies';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import ImageCard from '../ImageCard/ImageCard';
import MovieCard from '../MovieCard/MovieCard';



function App() {

  const navigate = useNavigate();
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
  
   // Function to view card details
  function viewCardDetails(card) {
    setSelectedCard(card);
    navigate(`/movie/${card.id}`)
  }
  
  // // Function to go back to the card list used in the MovieCard NO LONGER NEED THIS FUNCTION TO GET BACK
  // function goBackToMain() {
  //   setSelectedCard(null);
  //   navigate('/')
  // }
  
  // console.log(movies)
  return (
    <main className='App'>
      <h1 className='bigHeading'>Rancid Tomatillos</h1>
      <nav>
        <NavLink to="/" className="nav">Main</NavLink>
      </nav>
      <Routes>
        <Route
          path="/"
          element={<Movies movies={movies} viewCardDetails={viewCardDetails} />}
        />
        <Route
          path="/movie/:id"
          element={<MovieCard />}
        />
      </Routes>
      {error && <h2>Something went wrong, please try again later!</h2>}
    </main>
  );

}

export default App;


