import React from 'react';
import {Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

const placeholderImage = require('../assets/images/image-placeholder.jpg');
const propTypes = {
  item: PropTypes.object,
};

class Card extends React.PureComponent {
  render() {
    const {navigation, item} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('--------------------------------------------');
          console.log('ID: ' + item.id, 'Poster_path: ' + item.poster_path);
          console.log('--------------------------------------------');
          navigation.navigate('Details', {movieId: item.id});
        }}
        style={styles.container}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={
            item.poster_path
              ? {uri: 'https://image.tmdb.org/t/p/w500/' + item.poster_path}
              : placeholderImage
          }
        />
        {!item.poster_path && (
          <Text style={styles.movieName}>{item.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 200,
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },
  movieName: {
    position: 'absolute',
    width: 100,
    top: 10,
    textAlign: 'center',
  },
});

Card.propTypes = propTypes;

export default Card;
