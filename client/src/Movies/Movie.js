import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import MovieCard from './MovieCard';

const Movie = (props) => {
  const [movie, setMovie] = useState();

  const id = useParams();
  useEffect(() => {
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook
    console.log(id.id);
    axios
      .get(`http://localhost:5000/api/movies/${id.id}`)
      .then(response => {
        console.log("Movie -> response", response)

        setMovie(response.data);
      })
      .catch(error => {
        console.error(error);
      });

  }, [id]);

  // Uncomment this only when you have moved on to the stretch goals
  const saveMovie = () => {
    const addToSavedList = props.addToSavedList;
    addToSavedList(movie)
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  // const { title, director, metascore, stars } = movie;
  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} key={movie.id} />
      <div onClick={saveMovie} className="save-button">Save</div>
    </div>
  );
}

export default Movie;
