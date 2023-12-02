import logo from '../logo.svg';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import './App.css';
import Movies from '../Movies/Movies';
import ImageCard from '../ImageCard/ImageCard';
import MovieCard from '../MovieCard/MovieCard';
import movieData from '../data.js'

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
  
   // Function to view card details
  function viewCardDetails(card) {
    setSelectedCard(card);
  }
  
  // // Function to go back to the card list used in the MovieCard
  function goBackToMain() {
    setSelectedCard(null);
  }
  
  // console.log(movies)

  return (
    <main className='App'>
      <h1 className='bigHeading'>Rancid Tomatillos</h1>
      {selectedCard ? (<MovieCard card={selectedCard} goBackToMain={goBackToMain} />
      ) : (<Movies movies={movies} viewCardDetails={viewCardDetails}/>
    )}
    {error && <h2>Something went wrong, please try again later!</h2>}
    </main>
  );
}

export default App;

