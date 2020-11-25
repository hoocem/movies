const API_KEY = '90c57e831f0b03c383373c70b1c06d8e'; //in real world app this would be moved to .env file

export const getSearchedMovies = (text) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${text}&include_adult=false`;
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log('error = ', err));
};

export const getMoviePoster = (posterPath) => {
  return 'https://image.tmdb.org/t/p/w300' + posterPath;
};

export const categories = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};
