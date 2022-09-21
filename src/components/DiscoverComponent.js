import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../config/Colors';

const DiscoverComponent = () => {
  const ProductionTag = ({keyword}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: Colors.grey,
          paddingVertical: 5,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 15,
          paddingHorizontal: 15,
          marginEnd: 6,
        }}>
        <Text style={{color: Colors.white, fontSize: 14, fontWeight: '600'}}>
          {keyword}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{'Production'}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <ProductionTag keyword={'aniventure'} />
        <ProductionTag keyword={'Align'} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{'Keywords'}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <ProductionTag keyword={'cat'} />
        <ProductionTag keyword={'dog'} />
      </View>
    </View>
  );
};

export default DiscoverComponent;

const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.grey,
    textAlign: 'center',
  },
});
