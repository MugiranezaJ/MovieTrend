import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import {getMovie} from '../services/services';

const height = Dimensions.get('screen').height;

const Details = ({route, navigation}) => {
  const movieId = route.params.movieId;
  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const placeholderImage = require('../assets/images/image-placeholder.jpg');

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);
  return (
    <React.Fragment>
      {loaded && (
        <ScrollView>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={
              movieDetail.poster_path
                ? {
                    uri:
                      'https://image.tmdb.org/t/p/w500/' +
                      movieDetail.poster_path,
                  }
                : placeholderImage
            }
          />
          <View style={styles.container}>
            <Text style={styles.movieTile}>{movieDetail.title}</Text>
            {movieDetail.genres && (
              <View style={styles.genresContainer}>
                {movieDetail.genres.map(genre => {
                  return (
                    <Text key={genre.id} style={styles.genre}>
                      {genre.name}
                    </Text>
                  );
                })}
              </View>
            )}
            <StarRating
              disabled
              maxStars={5}
              fullStarColor={'gold'}
              starSize={25}
              rating={movieDetail.vote_average}
            />
          </View>
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator style={styles.loader} size={'large'} />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
  },
  image: {
    height: height / 2,
  },
  loader: {
    height: height,
    color: '#0000ff',
  },
  movieTile: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#000',
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  genre: {
    marginRight: 10,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Details;
