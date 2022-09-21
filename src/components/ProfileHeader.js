import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../config/Colors';

const Header = props => {
  return (
    <View style={styles.header}>
      <Text
        numberOfLines={1}
        style={{fontSize: 16, fontWeight: '700', color: Colors.white}}>
        {props.name}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 50,
  },
});
