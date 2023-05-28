import React, { useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import styles from './Movies.module.css';

//initiating states
function SearchPage(props) {
  const {movies} = props;
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();
  const { query } = useParams();

  //searchQuery being handled and pushed to end of url
  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/search/${searchQuery}`);
  };

  //searchQuery being set to input value
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter movies based on search query
  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2 className={styles.redbox}> Movie Search</h2>
      <form onSubmit={handleSearch}>
        <input type="text" value={searchQuery} placeholder="Search by Available Titles or Genre" onChange={handleInputChange} className={styles['input-box']}/>
        <button className="btn btn-primary" type="submit">Search</button>
      </form>

      {/* Display filtered movies as images, link being made to Movie.js */}
      <div>
        {filteredMovies.map((movie, index) => (
        <Link key={index} to={`/movies/${movie.id}`}>
            <img
              src={movie.Poster}
              alt={movie.Title}
              style={{ width: '200px' }}
            />
        </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;


