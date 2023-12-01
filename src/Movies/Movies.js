import React from 'react';
import './Movies.css';
import ImageCard from '../ImageCard/ImageCard';
import MovieCard from '../MovieCard/MovieCard'



function Movies({ movies, viewCardDetails }) {
  
    //Map over the movies array and set each ImageCard up with these key values and a new Card componect is rendered
    return (
      <div className='ideas-container'>
        {movies.map((movie) => (
          <ImageCard
            key={movie.id}
            card={movie} //passing the movie object as the card prop to the ImageCard.js
            viewCardDetails={() => viewCardDetails(movie)} //passing the onViewCardDetails as a prop to ImageCard.js
          />
        ))}
      </div>
    );
  }
  
  export default Movies;