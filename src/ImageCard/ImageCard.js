import React from 'react';
import './ImageCard.css';
import PropTypes from 'prop-types';
import { Link, useParams, } from 'react-router-dom';



function ImageCard({ card }) {
  const { poster_path, id} = card;
  


  return (
    <Link to={`/movie/${id}`}> 
        <div className='logo-container'>
          <img src={poster_path} alt='Movie Poster' className='Movie-Poster' />
        </div>
    </Link>
  );
}

export default ImageCard;

ImageCard.propTypes = {
card: PropTypes.object.isRequired,
viewCardDetails: PropTypes.func.isRequired,
}


