import React from 'react';
import './ImageCard.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ImageCard({ card }) {
  const { poster_path, id} = card;

  return (
    <Link to={`/movie/${id}`}> 
        <div className='logo-container'>
          <img src={poster_path} alt='Movie Poster' className='movie-poster' />
        </div>
    </Link>
  );
}


ImageCard.propTypes = {
  card: PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired,  
    }).isRequired
};

export default ImageCard;