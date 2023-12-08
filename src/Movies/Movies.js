import React from 'react';
import './Movies.css';
import PropTypes from 'prop-types';
import ImageCard from '../ImageCard/ImageCard';


function Movies({ movies }) {
  //Map over the movies array and set each ImageCard up with these key values and a new Card componect is rendered
  return (
    <div className='ideas-container'>
      {movies.map((movie) => (
        <ImageCard
          key={movie.id}
          card={movie} //passing the movie object as the card prop to the ImageCard.js
        />
      ))}
    </div>
  );
}

Movies.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      average_rating: PropTypes.number.isRequired,
      release_date: PropTypes.string.isRequired,
    })
  )
}

export default Movies;

