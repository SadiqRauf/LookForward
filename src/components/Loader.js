import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';

const Loader = ({ start }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={'#262626'} animating={start} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: 'absolute',

    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
    height: '100%',
  },
});
export default Loader;
