import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import {Colors} from '../config/Colors';

const TrailerCard = props => {
  return (
    <TouchableOpacity
      style={{flexDirection: 'row'}}
      onPress={() =>
        Linking.openURL(`https://www.youtube.com/watch?v=${props.item.key}`)
      }>
      <View style={{flex: 0.45, justifyContent: 'center'}}>
        <Image source={require('../assets/image3.png')} style={styles.img} />
      </View>
      <View style={{flex: 0.55, justifyContent: 'center'}}>
        <View>
          <Text style={styles.name}>{props.item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TrailerCard;

const styles = StyleSheet.create({
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
  img: {
    height: 80,
    width: 140,
    borderRadius: 10,
    marginVertical: 10,
    marginEnd: 15,
  },
});
