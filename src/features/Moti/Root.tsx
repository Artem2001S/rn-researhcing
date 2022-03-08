import {StyleSheet, View} from 'react-native';
import React from 'react';
import SkeletonTest from './SkeletonTest';
// import Loader from './Loader';

const Root = () => {
  return (
    <View style={{flex: 1}}>
      {/* <Loader /> */}
      {/* <Todos /> */}
      <SkeletonTest />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Root;
