import {Button, FlatList, Pressable, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import {AnimatePresence, MotiView} from 'moti';
import {SafeAreaView} from 'react-native-safe-area-context';

const Todos = () => {
  const [todos, setTodos] = useState(['1', '2']);

  return (
    <SafeAreaView>
      <FlatList
        data={todos}
        renderItem={({item}) => {
          return (
            <AnimatePresence exitBeforeEnter>
              <MotiView
                key={item}
                from={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1500, type: 'timing'}}
                exit={{
                  opacity: 0,
                }}>
                <Pressable
                  onPress={() => setTodos(prev => prev.filter(s => s !== item))}
                  style={styles.todo}>
                  <Text>{item}</Text>
                </Pressable>
              </MotiView>
            </AnimatePresence>
          );
        }}
      />
      <Button
        title="Add"
        onPress={() => {
          setTodos(prev => [...prev, Math.random() * 100].slice(0, 1));
        }}
      />
    </SafeAreaView>
  );
};

export default Todos;

const styles = StyleSheet.create({
  todo: {
    marginHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderWidth: 2,
    marginVertical: 10,
    borderRadius: 10,
  },
});
