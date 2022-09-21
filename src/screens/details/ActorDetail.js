import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {data} from '../../config/data';
import {Colors} from '../../config/Colors';
import Card from '../../components/Card';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const ActorDetail = ({navigation}) => {
  const Tags = ({name}) => {
    return (
      <TouchableOpacity style={styles.tag}>
        <Text style={{color: Colors.white}}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const [activeTab, setActiveTab] = useState('Cast & Crew');

  const Tabs = () => {
    return (
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.leftTab,
            {
              backgroundColor:
                activeTab == 'Cast & Crew'
                  ? Colors.grey
                  : Colors.backgroundColor,
            },
          ]}
          onPress={() => setActiveTab('Cast & Crew')}>
          <Text style={styles.tabText}>{'Movies'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.midTab,
            {
              backgroundColor:
                activeTab == 'Trailer' ? Colors.grey : Colors.backgroundColor,
            },
          ]}
          onPress={() => setActiveTab('Trailer')}>
          <Text style={styles.tabText}>{'Trailer'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.rightTab,
            {
              backgroundColor:
                activeTab == 'Discover' ? Colors.grey : Colors.backgroundColor,
            },
          ]}
          onPress={() => setActiveTab('Discover')}>
          <Text style={styles.tabText}>{'Discover'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.black} />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={25}
            color={Colors.white}
          />
        </TouchableOpacity>
        <View style={styles.name}>
          <Text
            numberOfLines={1}
            style={{fontSize: 16, fontWeight: '700', color: Colors.white}}>
            {'The Gray Man'}
          </Text>
        </View>
      </View>

      <View style={styles.container}>
        <ScrollView>
          <View>
            <Image
              source={require('../../assets/image4.png')}
              style={{height: 250, width: '100%'}}
            />
          </View>
          {/* <LinearGradient colors={['#000', "#fff"]} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0.5}} style={styles.linearGradient}/> */}
          <View style={{paddingHorizontal: 15}}>
            <View style={{marginTop: 10}}>
              <Text style={styles.title}>The Gray Man</Text>
              <Text style={styles.date}>{'July 15 2022'}</Text>
              <Text style={styles.date}>{'2h 2m  PG-13'}</Text>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={styles.description}>
                The Thor film series is a run of four movies (so far) set in the
                Marvel Cinematic Universe consisting of Thor, Thor: The Dark
                World, Thor: Ragnarok and the upcoming Thor: Love and Thunder.
                The series is anchored by Chris Hemsworth as Thor, Tom
                Hiddleston as Loki and Natalie Portman as Jane Foster.
              </Text>
            </View>
            <View style={styles.tagsView}>
              <Tags name={'Action'} />
              <Tags name={'Adventure'} />
            </View>
            <View style={{alignItems: 'center'}}>
              <FlatList
                data={data}
                renderItem={({item}) => {
                  return (
                    <View
                      style={{
                        alignSelf: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Card />
                    </View>
                  );
                }}
                numColumns={2}
                centerContent={true}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ActorDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  linearGradient: {
    height: 50,
  },
  tag: {
    backgroundColor: Colors.backgroundColor,
    paddingVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 20,
    marginEnd: 10,
  },
  statusTxt: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '500',
  },
  title: {
    color: Colors.white,
    fontWeight: 'bold',
    marginVertical: 5,
    fontSize: 25,
  },
  date: {
    color: Colors.grey,
    fontWeight: '400',
    fontSize: 15,
  },
  description: {
    color: Colors.white,
    fontWeight: '400',
    textAlign: 'left',
    fontSize: 15,
  },
  tagsView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  tabs: {
    backgroundColor: Colors.backgroundColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 10,
    height: 35,
  },
  leftTab: {
    flex: 0.33,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  midTab: {
    flex: 0.33,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreText: {
    color: Colors.appColor,
    fontSize: 16,
    fontWeight: '500',
  },
  tabText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  rightTab: {
    flex: 0.33,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  header: {
    backgroundColor: Colors.backgroundColor,
    flexDirection: 'row',
    height: 50,
  },
  back: {
    flex: 0.2,
    marginEnd: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    justifyContent: 'center',
  },
});
