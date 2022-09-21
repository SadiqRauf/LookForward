import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {Colors} from '../../config/Colors';
import Header from '../../components/Header';
import CastAndCrew from '../../components/CastAndCrewComponent';
import TrailerCard from '../../components/TrailerCard';
import DiscoverComponent from '../../components/DiscoverComponent';
import {Backdrop, movie_Poster, TMDB_API_KEY} from '../../config/constant';
import Loader from '../../components/Loader';

const MovieDetails = props => {
  const {id, isTvShow} = props.route?.params;
  const [activeTab, setActiveTab] = useState('Cast & Crew');
  const [moviesDetails, setMoviesDetails] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    isTvShow ? getTvShow() : getMovies();
  }, [props]);

  const getMovies = async () => {
    setLoader(true);
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US&page=1&include_adult=false&append_to_response=videos,credits`,
      )
      .then(response => {
        setMoviesDetails(response.data);
        setLoader(false);
      })
      .catch(error => {
        console.log('movies', error);
        setLoader(false);
      });
  };

  const getTvShow = async () => {
    setLoader(true);
    await axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}&language=en-US&page=1&include_adult=false&append_to_response=videos,credits`,
      )
      .then(response => {
        setMoviesDetails(response.data);
        console.log('TVVVVVVV', JSON.stringify(response.data));
        setLoader(false);
      })
      .catch(error => {
        console.log('movies', error);
        setLoader(false);
      });
  };

  const Tags = ({name}) => {
    return (
      <TouchableOpacity style={styles.tag}>
        <Text style={{color: Colors.white}}>{name}</Text>
      </TouchableOpacity>
    );
  };

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
          <Text style={styles.tabText}>{'Cast & Crew'}</Text>
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
    <SafeAreaView style={styles.sContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.backgroundColor}
      />
      {loader && <Loader start={loader} />}
      <Header
        navigation={props.navigation}
        isTvShow={isTvShow}
        data={moviesDetails}
      />
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Image
              source={{
                uri: `${Backdrop}${moviesDetails.backdrop_path}`,
              }}
              style={{height: 250, width: '100%'}}
            />
          </View>
          {/* <LinearGradient colors={['#000', "#fff"]} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0.5}} style={styles.linearGradient}/> */}
          <View style={{paddingHorizontal: 15}}>
            <View style={{marginTop: 10}}>
              <Text style={styles.title}>
                {isTvShow ? moviesDetails.name : moviesDetails.title}
              </Text>
              <Text style={styles.date}>
                {isTvShow
                  ? moviesDetails.first_air_date
                  : moviesDetails.release_date}
              </Text>
              <Text style={styles.date}>{'2h 2m  PG-13'}</Text>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={styles.description}>{moviesDetails.overview}</Text>
            </View>
            <View style={styles.tagsView}>
              <FlatList
                data={moviesDetails.genres}
                renderItem={({item}) => {
                  return <Tags name={item.name} />;
                }}
                horizontal
                keyExtractor={item => item.id}
              />
            </View>
            <View style={{paddingVertical: 10}}>
              <Text style={styles.statusTxt}>{'Status: In Production'}</Text>
            </View>
            <Tabs />
            {activeTab == 'Cast & Crew' && (
              <View>
                <FlatList
                  data={moviesDetails?.credits?.cast}
                  renderItem={({item}) => {
                    return (
                      <CastAndCrew
                        // onPress={() => navigation.navigate('ActorDetail')}
                        name={item?.original_name}
                        job={item.character}
                        onPress={() => null}
                        source={{uri: `${movie_Poster}${item.profile_path}`}}
                      />
                    );
                  }}
                  keyExtractor={item => item.id}
                />
              </View>
            )}
            {activeTab == 'Trailer' && (
              <View>
                <FlatList
                  data={moviesDetails?.videos?.results}
                  renderItem={({item}) => {
                    return <TrailerCard item={item} />;
                  }}
                  keyExtractor={item => item.id}
                />
              </View>
            )}
            {activeTab == 'Discover' && (
              <View>
                <DiscoverComponent />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  sContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  linearGradient: {
    height: 50,
  },
  tag: {
    backgroundColor: Colors.grey,
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
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  date: {
    color: Colors.grey,
    fontSize: 15,
    fontWeight: '400',
  },
  description: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'left',
  },
  tagsView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  tabs: {
    backgroundColor: Colors.backgroundColor,
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
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
});
