import React, { useState } from "react";
import StarRating from "./Star-Review";
import Card from "react-bootstrap/Card";
import styles from './Movies.module.css';


//sets the state values
const NewReviewForm = ({ movie, addNewReview, updateMovie }) => {
  const [allReviews, setAllReviews] = useState(movie.reviews || []);
  const [reviews, setReviews] = useState("");
  const [rating, setRating] = useState(0);
  const [allRatings, setAllRatings] = useState([]);
  
  
  //uses PUT to update removal of review
  const deleteReview = (reviewId) => {
    console.log('delete')
    const updatedReviews = allReviews.filter(
    (reviews) => reviews.id !== reviewId
    );
    updateMovie({ ...movie, reviews: updatedReviews });
    setAllReviews(updatedReviews);
  };
console.log(allReviews);
  
  //handles submission of the review, uses PUT to update reviews property in API

  const onSubmit = (e) => {
    console.log('submit')
    e.preventDefault();
  
    if (reviews) {
      const newReviews = {
        id: Date.now(),
        reviews: reviews,
        rating: rating
      };
  
      setAllReviews([...allReviews, newReviews]);
      addNewReview(newReviews);
      setReviews('');
      setRating(0);
    } else {
      console.log('Invalid input');
    }
  };


//  handles the star button click, uses PUT to update rating
const onStarClick = (ratingValue) => {
  setRating(ratingValue);
  const updatedRatings = [...allRatings, ratingValue];
  setAllRatings(updatedRatings);
  updateMovie({ ...movie, id: movie.id, ratings: updatedRatings });
};


  
  //renders the review form and review list
  return (
    <div> {/*renders the review form*/}
      <div className="review-header">
        <h4 className={styles.redbox}>Add a new review</h4>
        <div className="review-rating">
          <label>Rating:</label>
          <StarRating rating={rating} onStarClick={onStarClick} />
        </div>
      </div>
      <form>
        <div>
          <textarea
            rows="4"
            cols="50"
            type="text"
            placeholder="Enter Review Here"
            onChange={(e)=>setReviews(e.target.value)}
            value={reviews}
          ></textarea>
        </div>
        <button className="btn btn-primary" type="submit" onClick={onSubmit}>

          Add Review
        </button>
        <div>
        {/*renders the review object and review list*/}
        {allReviews.map((reviews) => (
          <Card key={reviews.id}>
            <Card.Header>User</Card.Header>
            <Card.Body>
              <StarRating rating={reviews.rating}/>
              <Card.Text>{reviews.reviews}</Card.Text> {/*review component*/}
              <button
                className="btn btn-danger"
                onClick={() => deleteReview(reviews.id)}
              >
                Delete
              </button>
            </Card.Body>
          </Card>
        ))}
      </div>
      </form>
    </div>
  );
};

export default NewReviewForm;



