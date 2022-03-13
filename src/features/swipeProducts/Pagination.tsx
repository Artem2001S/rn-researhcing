import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface Props {
  colors: string[];
  scrollX: Animated.SharedValue<number>;
}

const DOT_SIZE = 12;

const {width} = Dimensions.get('screen');

const Pagination: React.FC<Props> = ({colors, scrollX}) => {
  const animStyles = useAnimatedStyle(() => {
    const inputRange = [-width, 0, width];

    const translateX = interpolate(scrollX.value, inputRange, [
      -ACTIVE_DOT_WIDTH,
      0,
      ACTIVE_DOT_WIDTH,
    ]);

    const inputRangeColors = colors.map((_, index) => index * width);

    const borderColor = interpolateColor(
      scrollX.value,
      inputRangeColors,
      colors,
    );

    return {
      transform: [{translateX}],
      borderColor,
    };
  }, [scrollX]);

  return (
    <View style={styles.root}>
      {colors.map(color => {
        return (
          <View style={styles.dotContainer}>
            <View style={[styles.dot, {backgroundColor: color}]} />
          </View>
        );
      })}
      <Animated.View style={[styles.circle, animStyles]} />
    </View>
  );
};

export default React.memo(Pagination);

const ACTIVE_DOT_WIDTH = DOT_SIZE * 2;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    flexDirection: 'row',
    height: ACTIVE_DOT_WIDTH,
    alignItems: 'center',
  },
  dotContainer: {
    width: ACTIVE_DOT_WIDTH,
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    width: ACTIVE_DOT_WIDTH,
    height: ACTIVE_DOT_WIDTH,
    borderWidth: 2,
    borderColor: '#666',
    borderRadius: DOT_SIZE,
    left: 0,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
  },
});
