import './MovieCard.css';
import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';


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
        .then((data) => {console.log(data.videos);
          setVideoData(data.videos)})
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

  const { title, poster_path, runtime, release_date, overview, tagline, average_rating } = additionalData || {};

  const teaserVideoKey = findTeaserVideoKey(videoData);
  const videoUrl = teaserVideoKey ? `https://www.youtube.com/embed/${teaserVideoKey}` : null;

  return (
    <article className="movie-card">
      <nav>
        <NavLink to="/" className="nav">Main</NavLink>
      </nav>
      <div className='details-wrap'> 
        <section className="left-container">
          <img src={poster_path} alt={title + ' movie poster'} className="poster" />
        </section>
        <section className="right-container">
          <h2 className="title">{title}</h2>
          <h3 className="release-date">released {release_date}</h3>
          <h3 className="average-rating">average rating {average_rating?.toFixed(2)}/10</h3>
          <p className="tagline">{tagline}</p>
          <p className='runtime'>{runtime} minutes</p>
          <p className="overview">{overview}</p>
          {teaserVideoKey && (
            <iframe width="560" height="315" src={videoUrl} allowFullScreen title="Teaser Video"></iframe>
          )}
        </section>
      </div>
      {error && <h2>Something went wrong, please try again later!</h2>}
    </article>
  );
}

export default MovieCard;
