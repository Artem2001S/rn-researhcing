import {Button, StyleSheet, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackScreens} from '../navigation/RootNavigation';

type Props = NativeStackScreenProps<RootStackScreens, 'Main'>;

const Main: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.root}>
      <View style={styles.btn}>
        <Button
          title="Dragndrop"
          onPress={() => {
            navigation.navigate('DragNDrop');
          }}
        />
        <Button
          title="Moti"
          onPress={() => {
            navigation.navigate('Moti');
          }}
        />
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  root: {flex: 1},
  btn: {},
});
