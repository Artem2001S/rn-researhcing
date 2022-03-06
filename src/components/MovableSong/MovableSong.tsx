/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import Song, {SongProps} from '../Song/Song';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {SONGS, SONG_HEIGHT} from '../../features/dragndrop/Dragndrop';

interface Props extends SongProps {
  scrollY: Animated.SharedValue<number>;
  positions: Animated.SharedValue<Record<number, number>>;
}

function clamp(value: number, lowerBound: number, upperBound: number) {
  'worklet';
  return Math.max(lowerBound, Math.min(value, upperBound));
}

function objectMove(object: any, from: number, to: number) {
  'worklet';
  const newObject = Object.assign({}, object);

  for (const id in object) {
    if (object[id] === from) {
      newObject[id] = to;
    }

    if (object[id] === to) {
      newObject[id] = from;
    }
  }

  return newObject;
}

const MovableSong: React.FC<Props> = ({positions, scrollY, ...props}) => {
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(positions.value[props.id] * SONG_HEIGHT);

  useAnimatedReaction(
    () => positions.value[props.id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          top.value = withSpring(currentPosition * SONG_HEIGHT);
        }
      }
    },
    [moving],
  );

  const gestureHandler = useAnimatedGestureHandler(
    {
      onStart: () => {
        runOnJS(setMoving)(true);
      },
      onActive: event => {
        const positionY = event.absoluteY + scrollY.value;
        top.value = withTiming(positionY - SONG_HEIGHT, {
          duration: 16,
        });

        const newPosition = clamp(
          Math.floor(positionY / SONG_HEIGHT),
          0,
          SONGS.length - 1,
        );

        if (positions.value[props.id] !== newPosition) {
          positions.value = objectMove(
            positions.value,
            positions.value[props.id],
            newPosition,
          );
        }
      },
      onFinish: () => {
        top.value = positions.value[props.id] * SONG_HEIGHT;
        runOnJS(setMoving)(false);
      },
    },
    [moving],
  );

  const aStyles = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      top: top.value,
      zIndex: moving ? 1 : 0,
      shadowColor: 'black',
      shadowOffset: {
        height: 0,
        width: 0,
      },
      shadowOpacity: withSpring(moving ? 0.4 : 0),
      shadowRadius: 10,
    };
  }, [moving]);

  return (
    <Animated.View style={aStyles}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={{maxWidth: '80%'}}>
          <Song {...props} />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default MovableSong;
