

import './MovieCard.css';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function MovieCard({ card, goBackToMain }) {
  const { id } = card;
  const [additionalData, setAdditionalData] = useState(null);
  const [videoData, setVideoData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch additional data based on the ID
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
      .then(response => response.json())
      .then(data => setAdditionalData(data.movie))
      .catch(error => setError(error.message))
  }, [id]);

  useEffect(() => {
    // Fetch video data based on the ID
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}/videos`)
      .then(response => response.json())
      .then(data => setVideoData(data.videos))
      .catch(error => setError(error.message))
  }, [id]);

  // Function to find the YouTube Teaser video key
  function findTeaserVideoKey(videos) {
    let teaserKey = null;
    videos.forEach((video) => {
      if (video.site === "YouTube" && video.type === "Teaser" || video.type === "Trailer") {
        teaserKey = video.key; // Set the key of the matching video
      }
    });
    return teaserKey; // Return the found key or null
  }

  const { title, poster_path, release_date, overview, genres, runtime, tagline, average_rating } = additionalData || {};

  const teaserVideoKey = findTeaserVideoKey(videoData);
  const videoUrl = teaserVideoKey ? `https://www.youtube.com/embed/${teaserVideoKey}` : null;

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
      {teaserVideoKey && (
        <iframe
          width="560"
          height="315"
          src={videoUrl}
          frameBorder="0"
          allowFullScreen
          title="Teaser Video"
        ></iframe>
      )}
      <button className='back-button' onClick={goBackToMain}>
        Return to All
      </button>
    </div>
  );
}

export default MovieCard;

MovieCard.propTypes = {
  card: PropTypes.object.isRequired,
  goBackToMain: PropTypes.func.isRequired,
}

