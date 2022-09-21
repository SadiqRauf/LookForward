import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../config/Colors';

const CastAndCrew = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <Image source={props.source} style={styles.img} />
      <View>
        <Text style={styles.name}>{props?.name}</Text>
        <Text style={styles.role}>{props?.job}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CastAndCrew;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
  role: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.grey,
  },
  img: {
    height: 100,
    width: 65,
    borderRadius: 10,
    marginVertical: 10,
    marginEnd: 15,
  },
});
