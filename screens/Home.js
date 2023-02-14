import React from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';
import {
  getFamilyMovies,
  getPopularMovies,
  getPopularTv,
  getUpcomingMovies,
} from '../services/services';

const Home = () => {
  const [moviesImages, setMoviesImage] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dimensions = Dimensions.get('screen');

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamilyMovies(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
        ]) => {
          const moviesImageArray = [];
          for (let movie of upcomingMoviesData) {
            moviesImageArray.push(
              'https://image.tmdb.org/t/p/w500/' + movie.poster_path,
            );
          }
          setMoviesImage(moviesImageArray);
          setPopularMovies(popularMoviesData);
          setPopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
          setLoaded(true);
        },
      )
      .catch(() => {
        setError(false);
      });

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
      .catch(() => setError(true))
      .finally(() => setLoaded(true));
  }, []);

  return (
    <React.Fragment>
      {loaded && !error && (
        <ScrollView>
          {/* Upcoming movies images */}
          {moviesImages && (
            <View style={styles.sliderBoxContainer}>
              <SliderBox
                images={moviesImages}
                autoplay={true}
                dotStyle={styles.dotStyle}
                sliderBoxHeight={dimensions.height / 1.5}
                circleLoop
              />
            </View>
          )}

          {/* Popular Movies */}
          {popularMovies && (
            <View style={styles.carousel}>
              <List title={'Popular Movies'} content={popularMovies} />
            </View>
          )}

          {/* Popular Tv series */}
          {popularTv && (
            <View style={styles.carousel}>
              <List title={'Popular TV'} content={popularTv} />
            </View>
          )}

          {/* Family Movies */}
          {familyMovies && (
            <View style={styles.carousel}>
              <List title={'Family Movies'} content={familyMovies} />
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && (
        <ActivityIndicator
          style={{height: dimensions.height}}
          size="large"
          color="#0000ff"
        />
      )}
      {error && <Error />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderBoxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotStyle: {
    height: 0,
  },
});
export default Home;
