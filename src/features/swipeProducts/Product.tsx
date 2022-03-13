import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface Props {
  source: string;
  index: number;
  name: string;
  description: string;
  scrollX: Animated.SharedValue<number>;
}

const {width, height} = Dimensions.get('screen');

const ITEM_SIZE = width * 0.65;

const Product: React.FC<Props> = ({
  source,
  name,
  index,
  scrollX,
  description,
}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const imageStyles = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.2, 1, 0.2],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{scale: withSpring(scale)}],
    };
  }, [index, scrollX]);

  const headerStyles = useAnimatedStyle(() => {
    const opacityInputRange = [
      (index - 0.52) * width,
      index * width,
      (index + 0.52) * width,
    ];

    const opacity = interpolate(
      scrollX.value,
      opacityInputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    const translateX = interpolate(scrollX.value, inputRange, [
      -width * 0.5,
      0,
      width * 0.5,
    ]);

    return {
      transform: [{translateX}],
      opacity,
    };
  }, []);

  const descriptionStyles = useAnimatedStyle(() => {
    const opacityInputRange = [
      (index - 0.32) * width,
      index * width,
      (index + 0.32) * width,
    ];

    const opacity = interpolate(
      scrollX.value,
      opacityInputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    const translateX = interpolate(scrollX.value, inputRange, [
      -width * 0.2,
      0,
      width * 0.2,
    ]);

    return {
      transform: [{translateX}],
      opacity,
    };
  }, []);

  return (
    <View style={[styles.root, {width, height}]}>
      <Animated.Image
        resizeMode="contain"
        style={[styles.img, {width: ITEM_SIZE, height: ITEM_SIZE}, imageStyles]}
        source={{uri: source}}
      />
      <View style={styles.descriptionContainer}>
        <Animated.Text style={[styles.name, headerStyles]}>
          {name}
        </Animated.Text>
        <Animated.Text style={[styles.description, descriptionStyles]}>
          {description}
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    flex: 0.8,
  },
  name: {
    color: '#444',
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 5,
  },
  description: {
    color: '#ccc',
    fontWeight: '600',
    textAlign: 'left',
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
  descriptionContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-end',
    flex: 0.5,
  },
});

export default React.memo(Product);
