import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { moviesApi } from './MoviesApi';
import SearchPage from './search-Results';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import MoviePage from './Movie';
import styles from './Movies.module.css';
import AddMovies from './addMovies';


//fetch async function that make API calls
const MainPage = () => {
  const [movies, setMovies] = useState([]);  


  const fetchMovies = async () => {
    const moviesData = await moviesApi.get();
    setMovies(moviesData);
  };

  const updateMovie = async (updatedMovie) => {
    await moviesApi.put(updatedMovie);
    fetchMovies();
  };

  const addMovie = async (newMovie) => {
    await moviesApi.post(newMovie);
    fetchMovies();
  };

  const deleteMovie = async (movieId) => {
    await moviesApi.delete(movieId);
    fetchMovies();
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  //react router to navigate to different paths (web pages)
  return (
    <div className={styles.movies}>
    <Container>
    <Router>
    <Button variant ="outline-secondary" > 
    <Link to="/search/:query">Search</Link> 
   </Button > 
   <Button variant ="outline-secondary" > 
    <Link to="/mainPage">Movie List</Link> 
   </Button > 
      <Switch>
        <Route path="/search/:query">
          <SearchPage movies={movies}/>
        </Route>
         <Route path="/movies/:movieId">
           <MoviePage movies={movies} updateMovie={updateMovie} deleteMovie={deleteMovie} addMovie={addMovie}/>
         </Route>
         <Route path="/mainPage">
          <AddMovies  movies={movies} addMovie={addMovie} deleteMovie={deleteMovie}/>
         </Route>
      </Switch>
    </Router>
    </Container>
    </div>
  ); 
  } 
  


export default MainPage;



