/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  AnimatableValue,
  interpolate,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  index: number;
  scrollXIndex: Animated.SharedValue<number>;
  width: number;

  height: number;
  source: string;
}

const Item: React.FC<Props> = ({
  width,
  source,
  index,
  scrollXIndex,
  height,
}) => {
  const aStyles = useAnimatedStyle(() => {
    const inputRange = [index - 1, index, index + 1];
    const translateX = interpolate(
      scrollXIndex.value,
      inputRange,
      [50, 0, -100],
    );

    const scale = interpolate(scrollXIndex.value, inputRange, [0.8, 1, 1.3]);

    const opacity = interpolate(scrollXIndex.value, inputRange, [
      1 - 1 / 3,
      1,
      0,
    ]);

    return {
      opacity: withTiming(opacity),
      transform: [
        {translateX: withTiming(translateX)},
        {scale: withTiming(scale)},
      ],
    };
  }, [index, scrollXIndex]);

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: -width / 2,
          width,
          height,
        },
        aStyles,
      ]}>
      <Image source={{uri: source}} style={{width, height}} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({});

export default React.memo(Item);
