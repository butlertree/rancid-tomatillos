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

  //Temporary way to get the data from data.js
  useEffect(() => {
    setMovies(movieData.movies)
    
  }, []);
  
   // Function to view card details
  function viewCardDetails(card) {
    setSelectedCard(card);
  }
  
  // // Function to go back to the card list used in the MovieCard
  function goBackToMain() {
    setSelectedCard(null);
  }
  
  console.log(movies)

  return (
    <main className='App'>
      <h1 className='bigHeading'>Rancid Tomatillos</h1>
      {selectedCard ? (<MovieCard card={selectedCard} goBackToMain={goBackToMain} />
      ) : (<Movies movies={movies} viewCardDetails={viewCardDetails} />
    )}
    </main>
  );
}

export default App;

App.propTypes = {

}