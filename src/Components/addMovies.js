import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from './Movies.module.css';

//state management of new attributes of submitted objects
const AddMovies = ({ movies, addMovie, deleteMovie}) => {
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieYear, setNewMovieYear] = useState('');
  const [submittedMovies, setAllSubmittedMovies]= useState([]);
 
//function to add new movie object that user inputs
const onSubmit = (e) => {
  e.preventDefault();
    if (newMovieTitle && newMovieYear) {
  const newMovie = {
    Title: newMovieTitle,
    Year: newMovieYear
  };

  addMovie(newMovie);
  setAllSubmittedMovies([...submittedMovies, newMovie]);
  setNewMovieTitle('');
  setNewMovieYear('');
} else {
      console.log('Invalid input');
    }
};

//function to delete movie object
  const handleDeleteMovie = (movieId) => {
    const updatedMovies = movies.filter((movie) => movie.movieId !== movieId);
    console.log(updatedMovies)
    deleteMovie(movieId);
    
  };

  // Filter movies that are only submitted and hides the rest
  const filteredMovies = movies.filter((movie) =>
  submittedMovies.some((submittedMovie) => submittedMovie.Title === movie.Title)
);
  
  return (  //jsx that renders movie list and input boxes
    <div>
      <h2 className={styles.redbox}>Add New Movie</h2>
      <form 
      onSubmit={onSubmit}
      >
        <div>
          <h2 className={styles.white}>Title:</h2>
          <input
            type="text"
            value={newMovieTitle}
            onChange={(e) => setNewMovieTitle(e.target.value)}
          />
        </div>
        <div>
          <h2 className={styles.white}>Year:</h2>
          <input
            type="text"
            value={newMovieYear}
            onChange={(e) => setNewMovieYear(e.target.value)}
          />
        </div>
        <button type="submit" className='btn btn-primary'>Add Movie</button>
              <h2 className={styles.red}> Movies List</h2>
              <div>
              {filteredMovies.slice().reverse().map((movie) => (
                  <Card key={movie.id}>
                    <Card.Body>
                      <Card.Title>{movie.Title}</Card.Title>
                      <Card.Title>{movie.Year}</Card.Title>
                      <Button
                        variant="danger"
                       onClick={() => handleDeleteMovie(movie.id)} //deletMovie
                        >Delete
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </div>
           </form>
    </div>
  );
};

export default AddMovies;
