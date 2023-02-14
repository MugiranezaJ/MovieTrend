import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  errorText1: PropTypes.string,
  errorText2: PropTypes.string,
};

const defaultProps = {
  errorText1: 'Oops! Something went wrong!',
  errorText2: 'Make sure you are online and restart the app.',
};
const dimensions = Dimensions.get('screen');

class Error extends React.PureComponent {
  render() {
    const {errorText1, errorText2} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{errorText1}</Text>
        <Text style={styles.text}>{errorText2}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: dimensions.height,
  },
  text: {
    fontWeight: 'bold',
  },
});

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;
export default Error;
