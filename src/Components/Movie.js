import React from 'react';
import { useParams } from 'react-router-dom';
import NewReviewForm from './ReviewForm';
import { useRouteMatch, Switch, Route, Link} from 'react-router-dom';
import Card from "react-bootstrap/Card";



function MoviePage({ movies, updateMovie, deleteMovie, addMovie }) {
  const { movieId } = useParams();
  const movie = movies.find(movie => movie.id === movieId);
  const match = useRouteMatch();
  

  if (!movie) {
    // Handle case where movie is not found
    return <div>Movie not found</div>;
  }
  
  //function to add a new review
  const addNewReview = (reviews) => updateMovie({...movie, reviews: [...movie.reviews, reviews]});
  
//jsx that uses uses useRouteMatch to link and route to ReviewForm. Also renders movie page and object
  return (
    <Card style={{backgroundColor: "black", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", position: "fixed", overflow: "scroll", top: 0, right: 0, bottom: 0, left: 0}}>
        <Card.Header>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Subtitle>{movie.Year}</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col">
              <img src={movie.Poster} alt={movie.Title} />
            </div>
            <div className="col">
              <Link to={`${match.url}/reviews`}>
                <NewReviewForm
                  movie={movie}
                  addNewReview={addNewReview}
                  deleteMovie={deleteMovie}
                  updateMovie={updateMovie}
                  addMovie={addMovie}
                />
              </Link>
              <Switch>
                <Route path={`${match.path}/reviews/:reviewId`}>
                  <NewReviewForm
                    movie={movie}
                    addNewReview={addNewReview}
                    deleteMovie={deleteMovie}
                    updateMovie={updateMovie}
                    addMovie={addMovie}
                  />
                </Route>
              </Switch>
            </div>
          </div>
        </Card.Body>
      </Card>
  );
}


export default MoviePage;
