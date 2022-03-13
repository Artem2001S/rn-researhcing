import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface Props {
  scrollX: Animated.SharedValue<number>;
  colors: string[];
}

const {width} = Dimensions.get('screen');
const CIRCLE_SIZE = width * 0.57;

const ProductCircle: React.FC<{
  color: string;
  scrollX: Animated.SharedValue<number>;
  index: number;
}> = ({color, scrollX, index}) => {
  const aStyles = useAnimatedStyle(() => {
    const inputRange = [
      (index - 0.5) * width,
      index * width,
      (index + 0.5) * width,
    ];

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{scale: withSpring(scale)}],
      opacity: withSpring(scale),
    };
  }, []);

  return (
    <Animated.View style={[styles.circle, {backgroundColor: color}, aStyles]} />
  );
};

const ProductCircles: React.FC<Props> = ({scrollX, colors}) => {
  return (
    <View style={[styles.circles]}>
      {colors.map((item, index) => {
        return (
          <ProductCircle
            key={index}
            index={index}
            scrollX={scrollX}
            color={item}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  circles: {},
  circle: {
    position: 'absolute',

    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE,
    top: 120,
    alignSelf: 'center',
  },
});

export default ProductCircles;
