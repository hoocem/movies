import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {toggleFav} from '../store/reducers/favReducer';
import {getMoviePoster} from '../services/moviesService';

const MovieItem = ({movie, onClick}) => {
  const dispatch = useDispatch();
  const favoriteMovies = useSelector((state) => state.favoriteMovies);

  const shareMovie = () => {
    Share.share({message: getMoviePoster(movie.poster_path)});
  };

  const displayFavIcon = () => {
    let iconName = 'heart-outline';
    if (favoriteMovies.findIndex((item) => item.id === movie.id) !== -1) {
      iconName = 'heart';
    }
    return <Ionicons style={{color: '#CD9B44'}} name={iconName} size={30} />;
  };

  return (
    <TouchableOpacity
      style={styles.mainCOntainer}
      onPress={() => onClick(movie)}>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.shareIcon} onPress={shareMovie}>
          <Ionicons
            style={{color: 'white'}}
            name="md-share-social-sharp"
            size={23}
          />
        </TouchableOpacity>
        <Image
          style={styles.image}
          source={{uri: getMoviePoster(movie.poster_path)}}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{movie.original_title}</Text>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => dispatch(toggleFav(movie))}>
            {displayFavIcon()}
          </TouchableOpacity>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.rating}>
            <Ionicons style={styles.icon} name="ios-star" size={20} />
            <Text style={styles.ratingText}>{movie.vote_average}</Text>
          </View>
          <View style={styles.releaseDate}>
            <FontAwesome style={styles.icon} name="calendar-o" size={20} />
            <Text style={styles.releaseDateText}>{movie.release_date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainCOntainer: {
    height: 300,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 12,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 3,
    width: '100%',
  },
  image: {
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'gray',
  },
  shareIcon: {
    zIndex: 5,
    alignSelf: 'flex-end',
    position: 'absolute',
    paddingTop: 10,
    paddingRight: 10,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    borderRadius: 15,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  detailContainer: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  icon: {
    color: '#CD9B44',
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
  },
  rating: {
    flexDirection: 'row',
  },
  releaseDate: {
    flexDirection: 'row',
  },
  ratingText: {
    marginLeft: 5,
    marginRight: 20,
  },
  releaseDateText: {
    marginLeft: 5,
  },
});

export default MovieItem;
