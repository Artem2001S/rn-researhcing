/* eslint-disable react-native/no-inline-styles */
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import OverflowView from './OverflowView';
import {useSharedValue, withSpring, withTiming} from 'react-native-reanimated';
import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Item from './Item';

const data_ = [
  {
    title: 'Art 1',
    subtitle: 'Subtitle 1',
    image:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Art 2',
    subtitle: 'Subtitle 2',
    image:
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Art 3',
    subtitle: 'Subtitle 3',
    image:
      'https://images.unsplash.com/photo-1561214115-f2f134cc4912?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Art 4',
    subtitle: 'Subtitle 4',
    image:
      'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Art 5',
    subtitle: 'Subtitle 5',
    image:
      'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Art 6',
    subtitle: 'Subtitle 6',
    image:
      'https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Art 7',
    subtitle: 'Subtitle 7',
    image:
      'https://images.unsplash.com/photo-1556139943-4bdca53adf1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
];

const SPACING = 30;
const ITEM_WIDTH = Dimensions.get('screen').width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.6;
const OVERFLOW_HEIGHT = 80;

const FlatListSwipeAnimation = () => {
  const [data, setData] = useState(data_);
  const scrollXIndex = useSharedValue(0);
  const scrollXAnimated = useSharedValue(0);

  useEffect(() => {
    scrollXAnimated.value = withSpring(scrollXIndex.value);
  });

  const [index, setIndex] = useState(0);

  const changeIndex = (index_: number) => {
    if (index_ <= data.length - 1 && index_ >= 0) {
      setIndex(index_);
      scrollXIndex.value = withTiming(index_);
    }
  };

  return (
    <FlingGestureHandler
      direction={Directions.LEFT}
      onHandlerStateChange={e => {
        if (e.nativeEvent.state === State.END) {
          changeIndex(index + 1);
        }
      }}>
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={e => {
          if (e.nativeEvent.state === State.END) {
            if (e.nativeEvent.state === State.END) {
              changeIndex(index - 1);
            }
          }
        }}>
        <SafeAreaView style={{flex: 1}}>
          <OverflowView items={data} overflowHeight={OVERFLOW_HEIGHT} />
          <FlatList
            data={data}
            inverted
            horizontal
            keyExtractor={(_, index_) => String(index_)}
            removeClippedSubviews={false}
            scrollEnabled={false}
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: SPACING * 2,
            }}
            CellRendererComponent={({
              index: index_,
              children,
              style,
              ...props
            }) => {
              const style_ = [style, {zIndex: data.length - index_}];

              return (
                <View style={style_} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({item, index: index_}) => {
              return (
                <Item
                  source={item.image}
                  index={index_}
                  scrollXIndex={scrollXIndex}
                  width={ITEM_WIDTH}
                  height={ITEM_HEIGHT}
                />
              );
            }}
          />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({});

export default FlatListSwipeAnimation;
