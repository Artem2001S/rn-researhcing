import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  overflowHeight: number;
  scrollX: Animated.SharedValue<number>;
  strings: string[];
}

const width = Dimensions.get('screen').width;

const ProductTypeIndicator: React.FC<Props> = ({
  overflowHeight,
  scrollX,
  strings,
}) => {
  const insets = useSafeAreaInsets();

  const aStyles = useAnimatedStyle(() => {
    const inputRange = [-width, 0, width];
    const translateY = interpolate(scrollX.value, inputRange, [
      overflowHeight,
      0,
      -overflowHeight,
    ]);

    return {
      transform: [{translateY}],
    };
  }, []);

  return (
    <Animated.View
      style={[styles.root, {top: insets.top + 15, height: overflowHeight}]}>
      <Animated.View style={[aStyles]}>
        {strings.map(str => {
          return (
            <View>
              <Text
                style={[
                  {fontSize: overflowHeight, lineHeight: overflowHeight},
                  styles.text,
                ]}>
                {str}
              </Text>
            </View>
          );
        })}
      </Animated.View>
    </Animated.View>
  );
};

export default React.memo(ProductTypeIndicator);

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    overflow: 'hidden',

    left: 10,
  },
  text: {
    textTransform: 'uppercase',
    fontWeight: '600',
    color: '#444',
  },
});
