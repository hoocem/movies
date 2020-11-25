import React from 'react';
import {View, StyleSheet, Image, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import MovieItem from '../components/MovieItem';

const Favorites = () => {
  const navigation = useNavigation();
  const favoriteMovies = useSelector((state) => state.favoriteMovies);

  const displayDetails = (movie) => {
    navigation.navigate('MovieDetails', {movie: movie});
  };

  if (!favoriteMovies.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.headertext}>Favorites</Text>
        <Text style={styles.descriptionText}>
          Save movies you like by tapping the heart icon.
        </Text>
        <Image
          source={require('../assets/appreciation.png')}
          style={styles.imgBackground}
        />
      </View>
    );
  }
  return (
    <FlatList
      style={{width: '100%', paddingTop: 20}}
      data={favoriteMovies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <MovieItem movie={item} onClick={displayDetails} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  headertext: {
    marginTop: 10, //+ StatusBar.currentHeight,
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionText: {
    marginBottom: 10,
    paddingTop: 10,
    fontSize: 17,
  },
  imgBackground: {
    flex: 1,
    resizeMode: 'stretch',
    width: '100%',
  },
});

export default Favorites;
