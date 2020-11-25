import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getSearchedMovies} from '../services/moviesService';
import SearchBar from '../components/SearchBar';
import MovieItem from '../components/MovieItem';

const Home = () => {
  const navigation = useNavigation();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (text) => {
    if (text) {
      setLoading(true);
      getSearchedMovies(text)
        .then((res) => {
          setMovies(res.results);
          setLoading(false);
        })
        .catch((err) => console.log('error = ', err));
    }
  };

  const displayDetails = (movie) => {
    navigation.navigate('MovieDetails', {movie: movie});
  };

  return (
    <View style={styles.mainContainer}>
      <SearchBar onSearch={handleSearch} />
      {!loading && !movies.length && (
        <Image
          source={require('../assets/videographer.png')}
          style={styles.imgBackground}
        />
      )}
      {loading && (
        <View style={styles.loadinContainer}>
          <ActivityIndicator size="large" color="#CD9B44" />
        </View>
      )}
      {!loading && !!movies.length && (
        <FlatList
          style={{width: '100%'}}
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <MovieItem movie={item} onClick={displayDetails} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  loadinContainer: {
    height: '85%',
    justifyContent: 'center',
  },
  imgBackground: {
    flex: 1,
    resizeMode: 'stretch',
    width: '100%',
  },
});

export default Home;
