import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../config/Colors';
import ToggleSwitch from 'toggle-switch-react-native';

const SwitchCard = ({title}) => {
  const [toggleSwitch, setToggleSwitch] = useState(false);
  return (
    <View
      style={{
        backgroundColor: Colors.backgroundColor,
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        borderBottomColor: Colors.grey,
        justifyContent: 'space-between',
        borderWidth: 0.2,
        height: 55,
      }}>
      <Text style={styles.title}>{title}</Text>
      <ToggleSwitch
        isOn={toggleSwitch}
        onColor={Colors.appColor}
        offColor={'#3a3a3a'}
        size="medium"
        onToggle={() => {
          setToggleSwitch(!toggleSwitch);
        }}
      />
    </View>
  );
};

export default SwitchCard;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
    paddingHorizontal: 15,
  },
});
