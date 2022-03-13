import {StyleSheet, View} from 'react-native';
import React from 'react';

interface Props {
  colors: string[];
}

const DOT_SIZE = 12;

const Pagination: React.FC<Props> = ({colors}) => {
  return (
    <View style={styles.root}>
      {colors.map(color => {
        return <View style={[styles.dot, {backgroundColor: color}]} />;
      })}
    </View>
  );
};

export default React.memo(Pagination);

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    flexDirection: 'row',
    height: DOT_SIZE,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    marginHorizontal: DOT_SIZE,
  },
});
