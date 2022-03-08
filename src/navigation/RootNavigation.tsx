import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from '../screens/Main';
import Dragndrop from '../features/dragndrop';
import Moti from '../features/Moti';

export type RootStackScreens = {
  Main: undefined;
  DragNDrop: undefined;
  Moti: undefined;
};

export const RootStack = createNativeStackNavigator<RootStackScreens>();

const RootNavigation = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Main" component={Main} />
      <RootStack.Screen
        name="DragNDrop"
        component={Dragndrop}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Moti"
        component={Moti}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigation;
