import React from 'react';
import {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {getPopularMovies, getUpcomingMovies} from '../services/services';

const Home = () => {
  const [moviesImages, setMoviesImage] = useState('');
  const [error, setError] = useState();
  const dimensions = Dimensions.get('screen');
  useEffect(() => {
    console.log('running....');
    getUpcomingMovies()
      .then(movies => {
        const moviesImageArray = [];
        for (let movie of movies) {
          moviesImageArray.push(
            'https://image.tmdb.org/t/p/w500/' + movie.poster_path,
          );
        }
        setMoviesImage(moviesImageArray);
      })
      .catch(err => setError(err));

    getPopularMovies()
      .then(movies => {
        // setMovies(movies[0]);
      })
      .catch(err => setError(err));
  }, []);
  return (
    <View style={styles.sliderBoxContainer}>
      <SliderBox
        images={moviesImages}
        autoplay={true}
        dotStyle={styles.dotStyle}
        sliderBoxHeight={dimensions.height / 1.5}
        circleLoop={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderBoxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    backgroundColor: 'blue',
    // paddingTop: '100px',
  },
  dotStyle: {
    height: 0,
  },
});
export default Home;
