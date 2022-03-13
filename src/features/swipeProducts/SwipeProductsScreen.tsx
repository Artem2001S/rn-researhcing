import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Product from './Product';
import Pagination from './Pagination';
import ProductTypeIndicator from './ProductTypeIndicator';

interface IProduct {
  source: string;
  type: string;
  heading: string;
  description: string;
  color: string;
  id: string;
}

const data: IProduct[] = [
  {
    type: 'Humlan P',
    source:
      'https://raw.githubusercontent.com/catalinmiron/react-native-headphones-carousel/77fef648759dc8390759856e262b71bdb4466ab6/assets/urbanears_blue.png',
    heading: 'Vibrant colors',
    description: 'Four on-trend colorways to seamlessly suit your style.',
    id: 'first',
    color: '#9dcdfa',
  },
  {
    type: 'Pampas',
    source:
      'https://raw.githubusercontent.com/catalinmiron/react-native-headphones-carousel/master/assets/urbanears_grey.png',
    heading: 'Redefined sound',
    description: 'A bold statement tuned to perfection.',
    id: 'second',
    color: '#999',
  },
  {
    type: 'Humlan P',
    source:
      'https://raw.githubusercontent.com/catalinmiron/react-native-headphones-carousel/master/assets/urbanears_mint.png',
    heading: 'Great quality',
    description:
      'An Urbanears classic! Listen-all-day fit. Striking the perfect balance of effortless technology',
    id: 'third',
    color: '#a1e3a1',
  },
  {
    type: 'Humlan B',
    source:
      'https://raw.githubusercontent.com/catalinmiron/react-native-headphones-carousel/master/assets/urbanears_pink.png',
    heading: 'From Sweden',
    description:
      'The “Plattan” in Plattan headphones is Swedish for “the slab.”',
    id: 'fourth',
    color: '#db9efa',
  },
];

const SwipeProductsScreen: React.FC = () => {
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(e => {
    scrollX.value = e.contentOffset.x;
  });

  return (
    <SafeAreaView style={styles.root}>
      <Animated.FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <Product
              scrollX={scrollX}
              source={item.source}
              index={index}
              name={item.heading}
              description={item.description}
            />
          );
        }}
      />
      <Image
        style={styles.logo}
        source={{
          uri: 'https://raw.githubusercontent.com/catalinmiron/react-native-headphones-carousel/master/assets/ue_black_logo.png',
        }}
      />
      <Pagination colors={data.map(item => item.color)} />
      <ProductTypeIndicator
        strings={data.map(item => item.type)}
        overflowHeight={50}
        scrollX={scrollX}
      />
    </SafeAreaView>
  );
};

const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;

const styles = StyleSheet.create({
  root: {flex: 1},
  logo: {
    position: 'absolute',
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
    opacity: 0.9,
    resizeMode: 'contain',
    left: 10,
    bottom: 10,
    transform: [
      {translateX: -LOGO_WIDTH / 2},
      {translateY: -LOGO_HEIGHT / 2},
      {rotateZ: '-90deg'},
      {translateX: LOGO_WIDTH / 2},
      {translateY: LOGO_HEIGHT / 2},
    ],
  },
});

export default SwipeProductsScreen;
