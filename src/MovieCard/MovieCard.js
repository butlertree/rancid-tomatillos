
import './MovieCard.css';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// { goBackToMain }

function MovieCard() {
  const { id } = useParams();
  const [additionalData, setAdditionalData] = useState(null);
  const [videoData, setVideoData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
        .then((response) => response.json())
        .then((data) => setAdditionalData(data.movie))
        .catch((error) => setError(error.message));

      fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}/videos`)
        .then((response) => response.json())
        .then((data) => setVideoData(data.videos))
        .catch((error) => setError(error.message));
    }
  }, [id]);

  function findTeaserVideoKey(videos) {
    let teaserKey = null;
    videos.forEach((video) => {
      if (video.site === 'YouTube' && (video.type === 'Teaser' || video.type === 'Trailer')) {
        teaserKey = video.key;
      }
    });
    return teaserKey;
  }

  const { title, poster_path, release_date, overview, tagline, average_rating } = additionalData || {};

  const teaserVideoKey = findTeaserVideoKey(videoData);
  const videoUrl = teaserVideoKey ? `https://www.youtube.com/embed/${teaserVideoKey}` : null;

  return (
    <div className="movie-card">
      <div className="left-container">
        <img src={poster_path} alt="movie poster" className="poster" />
      </div>
      <div className="right-container">
        <h2 className="title">{title}</h2>
        <p className="tagline">{tagline}</p>
        <h3 className="release-date">{release_date}</h3>
        <h3 className="average-rating">average {average_rating?.toFixed(2)}/10</h3>
        <p className="overview">{overview}</p>
        {teaserVideoKey && (
          <iframe width="560" height="315" src={videoUrl} allowFullScreen title="Teaser Video"></iframe>
        )}
      </div>
      {error && <h2>Try Again Later!</h2>}
    </div>
  );
}

MovieCard.propTypes = {
  goBackToMain: PropTypes.func.isRequired,
};

export default MovieCard;
