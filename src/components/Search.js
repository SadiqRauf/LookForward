import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Colors} from '../config/Colors';

const Search = props => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="magnify" size={25} color={Colors.grey} />
      <TextInput
        placeholder="Movies & People"
        placeholderTextColor={Colors.grey}
        style={{color: Colors.white, flex: 1}}
        onChangeText={props.onChangeText}
        onBlur={() => props.onSubmitSearch()}
        value={props.value}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});
