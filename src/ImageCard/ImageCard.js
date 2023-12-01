import React from 'react';
import './ImageCard.css';
import PropTypes from 'prop-types';



function ImageCard({ card, viewCardDetails }) {
  const { poster_path } = card;

  return (
    <div className='card' onClick={viewCardDetails}>
        <div className='logo-container'>
          <img src={poster_path} alt='Movie Poster' className='Movie-Poster' />
        </div>
    </div>
  );
}

export default ImageCard;

ImageCard.propTypes = {}