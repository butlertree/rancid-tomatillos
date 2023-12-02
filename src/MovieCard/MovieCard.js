import React from 'react';
import './MovieCard.css';
import PropTypes from 'prop-types';

// from https://rancid-tomatillos.herokuapp.com/api/v2/movies/<id>/ need to grab key values of title, poster_path, release_date, overview, genres, budget, revenue, runtime, tagline, and average_rating

//USER STORY: As a user, I can click a movie, and see that movie’s details

function MovieCard({card, goBackToMain}) {
  // when API is hooked up, will need a GET request for the details of the card with the matching id
  const { poster_path, title, release_date, average_rating } = card;
  return (
    <div>
      <section className='DetailView'>
        <img src={poster_path} alt='movie poster' className='Poster' />
        <article className='DetailDisplay'>
          <h2 className='MovieTitle'>{title}</h2>
          <h3 className='ReleaseDate'>{release_date}</h3>
          <h3 className='Rating'>average {average_rating.toFixed(2)}/10</h3>
        </article>
      </section>
      <button className='BackButton' onClick={goBackToMain}>Return to All</button>
    </div>
  )
}

export default MovieCard

// .propTypes = {

// }