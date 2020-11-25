const initialState = {favoriteMovies: []};

const favReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favIndex = state.favoriteMovies.findIndex(
        (item) => item.id === action.data.movie.id,
      );
      if (favIndex !== -1) {
        return {
          ...state,
          favoriteMovies: state.favoriteMovies.filter(
            (item, index) => index !== favIndex,
          ),
        };
      } else {
        return {
          ...state,
          favoriteMovies: state.favoriteMovies.concat(action.data.movie),
        };
      }
    default:
      return state;
  }
};

export const toggleFav = (movie) => {
  return {
    type: 'TOGGLE_FAVORITE',
    data: {movie},
  };
};

export default favReducer;
