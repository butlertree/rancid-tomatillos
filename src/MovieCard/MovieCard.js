
import './MovieCard.css';
import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

// from https://rancid-tomatillos.herokuapp.com/api/v2/movies/<id>/ need to grab key values of title, poster_path, release_date, overview, genres, budget, revenue, runtime, tagline, and average_rating

//USER STORY: As a user, I can click a movie, and see that movie’s details

function MovieCard({ card, goBackToMain }) {
  const { id } = card;
  const [additionalData, setAdditionalData] = useState(null);

  const [error, setError] = useState('')

  useEffect(() => {
    // Fetch additional data based on the ID
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
      .then(response => response.json())
      .then(data => setAdditionalData(data.movie))
      .catch(error => setError(error.message))
  }, [id]); // Fetch data whenever the ID changes

  const { title, poster_path, release_date, overview, genres, runtime, tagline, average_rating } = additionalData || {};

  return (
    <div className='movie-card'>
      <div className='left-container'>
        <img src={poster_path} alt='movie poster' className='poster' />
        <p className='tagline'>{tagline}</p>
      </div>
      {error && <h2>Try Again Later!</h2>}
      <div className='right-container'>
        <h2 className='title'>{title}</h2>
        <h3 className='release-date'>{release_date}</h3>
        <h3 className='average-rating'>average {average_rating?.toFixed(2)}/10</h3>
        <p className='overview'>{overview}</p>
      </div>
      <button className='back-button' onClick={goBackToMain}>
        Return to All
      </button>
    </div>
  );
}

export default MovieCard;











// .propTypes = {

// }