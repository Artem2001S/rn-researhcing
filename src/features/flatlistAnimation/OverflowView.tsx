import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface Props {
  items: {title: string; subtitle: string}[];
  overflowHeight: number;
}

const OverflowView: React.FC<Props> = ({items, overflowHeight}) => {
  return (
    <View style={[styles.root, {height: overflowHeight}]}>
      {items.map((item, index) => {
        return (
          <View key={index} style={[styles.item, {height: overflowHeight}]}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 20,
  },
});

export default OverflowView;
