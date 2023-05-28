const MOVIE_ENDPOINT = 'https://6431fe963e05ff8b371efb65.mockapi.io/moviesite';

//HTTP Requests to communicate with API
class MoviesApi {
    get = async () => {
        try {
            const resp = await fetch(MOVIE_ENDPOINT);
            const data = await resp.json();
            return data;
        } catch(e) {
            console.log('Opps, looks like fetchMovies had an issue.', e);
        }
        }
    put = async (movie) => {
        try {
            const resp = await fetch(`${MOVIE_ENDPOINT}/${movie.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            });
            return await resp.json();
        } catch(e) {
            console.log('Oops, looks like updating movies had an issue.', e);
        }
        }
    post = async (movie) => {
    try {
        const resp = await fetch(`${MOVIE_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        });
        return await resp.json();
    } catch(e) {
        console.log('Oops, looks like adding a new movie had an issue.', e);
    }
}
    delete = async (movieId) => { 
        console.log(movieId)
    try {
        const resp = await fetch(`${MOVIE_ENDPOINT}/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await resp.json();
    } catch(e) {
        console.log('Oops, looks like deleting the movie had an issue.', e);
    }
}


    }
    
export const moviesApi = new MoviesApi();