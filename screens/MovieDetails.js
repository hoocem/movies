import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Share,
  Animated,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {toggleFav} from '../store/reducers/favReducer';
import {getMoviePoster, categories} from '../services/moviesService';

const Moviedetails = ({route, navigation}) => {
  const dispatch = useDispatch();
  const favoriteMovies = useSelector((state) => state.favoriteMovies);

  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
  const AnimatedMaterialIcon = Animated.createAnimatedComponent(MaterialIcons);

  const getHeaderBackgroundColor = () => {
    return scrollY.interpolate({
      inputRange: [85, 170],
      outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1))'],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
  };

  const getShadowElevation = () => {
    return scrollY.interpolate({
      inputRange: [85, 170],
      outputRange: [0, 2],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
  };

  const getHeaderIconColor = () => {
    return scrollY.interpolate({
      inputRange: [85, 170],
      outputRange: ['rgba(255,255,255,1)', 'rgba(72,72,72,1))'],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
  };

  const shareMovie = () => {
    Share.share({message: getMoviePoster(route.params.movie.poster_path)});
  };

  const displayFavIcon = () => {
    const {movie} = route.params;

    let iconName = 'heart-outline';
    if (favoriteMovies.findIndex((item) => item.id === movie.id) !== -1) {
      iconName = 'heart';
    }
    return (
      <AnimatedIcon
        style={[
          styles.icon,
          {
            color: getHeaderIconColor(),
          },
        ]}
        name={iconName}
        size={30}
      />
    );
  };

  const displayDetail = (movie) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => {
            navigation.goBack();
          }}>
          <AnimatedMaterialIcon
            style={{color: getHeaderIconColor()}}
            name="arrow-back"
            size={27}
          />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={shareMovie}>
            <AnimatedIcon
              style={[
                styles.icon,
                {
                  color: getHeaderIconColor(),
                },
              ]}
              name="md-share-social-sharp"
              size={27}
              color="yellow"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(toggleFav(movie))}>
            {displayFavIcon()}
          </TouchableOpacity>
        </View>
        <Animated.ScrollView
          onScroll={Animated.event(
            [
              {
                nativeEvent: {contentOffset: {y: scrollY}},
              },
            ],
            {useNativeDriver: false},
          )}>
          <View style={styles.imageCOntainer}>
            <Image
              style={styles.image}
              source={{uri: getMoviePoster(movie.poster_path)}}
            />
          </View>
          <Text style={styles.title}>{movie.original_title}</Text>
          <View style={styles.detailContainer}>
            <View style={styles.voteDetail}>
              <View style={styles.voteDetailContainer}>
                <Ionicons
                  style={{color: '#CD9B44'}}
                  name="ios-star"
                  size={30}
                />
                <Text style={{color: '#000000'}}>{movie.vote_average}</Text>
              </View>
            </View>
            <View style={styles.releaseDetail}>
              <FontAwesome
                style={{color: '#CD9B44'}}
                name="calendar-o"
                size={30}
              />
              <Text style={{color: '#000000'}}>{movie.release_date}</Text>
            </View>
            <View style={styles.languageDetail}>
              <View style={styles.languageDetailContainer}>
                <FontAwesome
                  style={{color: '#CD9B44'}}
                  name="language"
                  size={30}
                />
                <Text
                  style={{
                    color: '#000000',
                  }}>
                  {movie.original_language.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.overview}>
            <Text style={styles.overviewHeader}>Overview</Text>
            <Text style={styles.overViewText}>{movie.overview}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.categories}>
            <Text style={styles.categoriesHeader}>Categories</Text>
            {movie.genre_ids.map((id, index) => {
              return (
                <View key={id} style={styles.category}>
                  <View style={styles.categoryItem}>
                    <Text style={{fontWeight: 'bold', color: '#CD9B44'}}>
                      CAT
                    </Text>
                    <Text style={{fontWeight: 'bold', color: '#CD9B44'}}>
                      {`0${index + 1}`}
                    </Text>
                  </View>
                  <Text style={styles.categoryContent}>{categories[id]}</Text>
                </View>
              );
            })}
          </View>
        </Animated.ScrollView>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={[
          styles.navbar,
          {
            backgroundColor: getHeaderBackgroundColor(),
            elevation: getShadowElevation(),
          },
        ]}></Animated.View>
      {displayDetail(route.params.movie)}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    zIndex: 3,
    width: '100%',
    height: 70,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  loadingContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCOntainer: {
    flex: 1,
    width: '100%',
    height: 300,
    backgroundColor: 'yellow',
  },
  image: {
    width: '100%',
    height: 300,
  },
  iconContainer: {
    flexDirection: 'row',
    zIndex: 10,
    alignSelf: 'flex-end',
    position: 'absolute',
    paddingTop: 20,
    paddingRight: 10,
    elevation: 2,
  },
  backIcon: {
    zIndex: 10,
    position: 'absolute',
    paddingTop: 20,
    paddingLeft: 10,
    elevation: 2,
  },
  icon: {
    marginLeft: 20,
  },
  title: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  detailContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: 'space-between',
  },
  voteDetail: {
    flex: 1,
    alignItems: 'flex-start',
  },
  voteDetailContainer: {
    alignItems: 'center',
  },
  releaseDetail: {
    flex: 1,
    alignItems: 'center',
  },
  languageDetail: {
    flex: 1,
    alignItems: 'flex-end',
  },
  languageDetailContainer: {
    alignItems: 'center',
  },
  divider: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: '#B0B0B0',
    borderBottomWidth: 1,
  },
  overview: {
    marginTop: 10,
    marginLeft: 10,
  },
  overviewHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  overViewText: {
    marginLeft: 5,
    marginRight: 5,
  },
  categories: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  categoriesHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryContent: {
    flexWrap: 'wrap',
    paddingLeft: 25,
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default Moviedetails;
