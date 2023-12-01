import React from 'react';
// import PropTypes from 'prop-types';
import './MovieCard.css';
import PropTypes from 'prop-types';

// card contains movie details
// poster on one side, details on the other
// from https://rancid-tomatillos.herokuapp.com/api/v2/movies/<id>/ need to grab key values of id, title, poster_path, release_date, overview, genres, budget, revenue, runtime, tagline, and average_rating
//currently w/o API, in the data file we have access to id, poster_path, title, release_date, and average_rating

//USER STORY: As a user, I can click a movie, and see that movie’s details
//onclick, display the poster matching the id of the event.target, hide all other posters, header static, button to return to all appears

function MovieCard({card, goBackToMain}) {
  // when API is hooked up, will need a GET request for the details of the card with the matching id
  const { title } = card;
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={goBackToMain}>Return to All</button>
    </div>
  )
}

export default MovieCard

// .propTypes = {

// }