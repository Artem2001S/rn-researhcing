import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import {MotiView} from 'moti';

const Loader = () => {
  return (
    <View style={styles.root}>
      <MotiView
        style={styles.circle}
        from={{
          opacity: 0,
          shadowOpacity: 0,
          borderWidth: 0,
          width: SIZE - 30,
          height: SIZE - 30,
        }}
        animate={{
          opacity: 1,
          shadowOpacity: 1,
          borderWidth: 5,
          width: SIZE,
          height: SIZE,
        }}
        transition={{
          type: 'timing',
          duration: 2050,
          loop: true,
        }}
      />
    </View>
  );
};

const SIZE = Dimensions.get('window').width * 0.34;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: SIZE / 2,
    width: SIZE,
    height: SIZE,
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 15,
  },
});

export default Loader;
