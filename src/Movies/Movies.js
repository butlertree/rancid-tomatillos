import React from 'react';
import './Movies.css';
import PropTypes from 'prop-types';
import ImageCard from '../ImageCard/ImageCard';

function Movies({ movies }) {
  return (
    <div className='ideas-container'>
      {movies.map((movie) => (
        <ImageCard
          key={movie.id}
          card={movie} 
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

