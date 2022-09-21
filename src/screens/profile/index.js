import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors} from '../../config/Colors';
import {styles} from './styles';
import Header from '../../components/ProfileHeader';
import SwitchCard from '../../components/SwitchCard';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.sContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.backgroundColor}
      />
      <Header name="Profile" />
      <View style={styles.container}>
        <View style={{paddingVertical: 20}}>
          <View style={{padding: 10}}>
            <Text style={{color: Colors.grey, fontSize: 14, fontWeight: '600'}}>
              {'COUNTDOWN NOTIFICATIONS'}
            </Text>
          </View>
          <SwitchCard title={'Day Before'} />
          <SwitchCard title={'Week Before'} />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.backgroundColor,
            paddingHorizontal: 15,
            alignItems: 'center',
            borderBottomColor: Colors.grey,
            justifyContent: 'space-between',
            justifyContent: 'center',
            borderWidth: 0.2,
            height: 55,
          }}>
          <Text style={{color: 'red', fontSize: 16, fontWeight: '600'}}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
