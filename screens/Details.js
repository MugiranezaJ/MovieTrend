import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {getMovie} from '../services/services';

const height = Dimensions.get('screen').height;

const Details = ({route, navigation}) => {
  const movieId = route.params.movieId;
  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const placeholderImage = require('../assets/images/image-placeholder.jpg');
  console.log('MovieId: ' + movieId);
  console.log(
    'MovieID: ' + movieDetail?.id,
    'MoviePosterPath: ' + JSON.stringify(movieDetail?.poster_path),
  );

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
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator style={styles.loader} size={'large'} />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  image: {
    height: height / 2,
  },
  loader: {
    height: height,
    color: '#0000ff',
  },
});

export default Details;
