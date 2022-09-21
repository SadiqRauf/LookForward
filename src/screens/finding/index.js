import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {styles} from './styles';
import {Colors} from '../../config/Colors';
import Search from '../../components/Search';
import Card from '../../components/Card';
import {TMDB_API_KEY} from '../../config/constant';
import Loader from '../../components/Loader';

const FindingScreen = props => {
  const [activeTab, setActiveTab] = useState('Movies');
  const [movies, setMovies] = useState('');
  const [tvShows, setTvShows] = useState('');
  const [searchtxt, setSearchTxt] = useState('');

  const [loader, setLoader] = useState(false);

  const [searchMovies, setSearchMovies] = useState([]);
  const [searchTvShow, setSearchTvShow] = useState([]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getMovies();
      getTvShows();
    });
    return unsubscribe;
  }, [props]);

  onChangeSearchTxt = text => {
    setSearchTxt(text);
  };

  const onSubmitSearch = async () => {
    searchtxt == ''
      ? activeTab == 'Movies'
        ? await getMovies()
        : await getTvShows()
      : activeTab == 'Movies'
      ? await getSearchMovies()
      : await getSearchTvShows();
  };
  const getMovies = async () => {
    setLoader(true);
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1&include_adult=false`,
      )
      .then(async response => {
        setMovies(response.data.results);
        setLoader(false);
        // getAsychStorageData();
      })
      .catch(error => {
        console.log('movies', error);
        setLoader(false);
      });
  };
  const getSearchMovies = async () => {
    setSearchMovies([]);
    setSearchTvShow([]);
    setLoader(true);
    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${searchtxt}&page=1&include_adult=false`,
      )
      .then(response => {
        setSearchMovies(response.data.results);
        setLoader(false);
      })
      .catch(error => {
        console.log('movies', error);
        setLoader(false);
      });
  };
  const getSearchTvShows = async () => {
    setSearchMovies([]);
    setSearchTvShow([]);
    setLoader(true);
    await axios
      .get(
        `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&language=en-US&query=${searchtxt}&page=1&include_adult=false`,
      )
      .then(response => {
        setSearchTvShow(response.data.results);
        setLoader(false);
      })
      .catch(error => {
        console.log('movies', error);
        setLoader(false);
      });
  };
  const getTvShows = async () => {
    setLoader(true);
    await axios
      .get(
        `https://api.themoviedb.org/3/tv/airing_today?api_key=${TMDB_API_KEY}&language=en-US&page=1&include_adult=false&include_video=true&vote_average.gte=1&vote_count.gte=10`,
      )
      .then(response => {
        setTvShows(response.data.results);
        setLoader(false);
      })
      .catch(error => {
        console.log('movies', error);
        setLoader(false);
      });
  };
  onSelectMovieTab = async () => {
    setSearchTxt('');

    setActiveTab('Movies');
    setLoader(true);
    await getMovies();
  };
  onSelectTvTab = async () => {
    setActiveTab('TvShows');
    setSearchTxt('');
    setLoader(true);
    await getTvShows();
  };

  const Tabs = () => {
    return (
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.leftTab,
            {
              backgroundColor:
                activeTab == 'Movies' ? Colors.grey : Colors.backgroundColor,
            },
          ]}
          onPress={() => onSelectMovieTab()}>
          <Text style={styles.tabText}>{'Movies'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.rightTab,
            {
              backgroundColor:
                activeTab == 'TvShows' ? Colors.grey : Colors.backgroundColor,
            },
          ]}
          onPress={() => onSelectTvTab()}>
          <Text style={styles.tabText}>{'TV Shows'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.black} />
      <Tabs />
      <Search
        onChangeText={txt => onChangeSearchTxt(txt)}
        onSubmitSearch={onSubmitSearch}
        value={searchtxt}
      />
      {loader && <Loader start={loader} />}
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.tabText}>{'Coming Soon'}</Text>
        </View>
        {activeTab == 'Movies' ? (
          <View style={{alignItems: 'center',height: '100%', paddingBottom: 150}}>
            <FlatList
            //  style={{ height: '100%', paddingBottom: 50 }}
              data={searchtxt == '' ? movies : searchMovies}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      alignSelf: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Card
                      onPress={() =>
                        props.navigation.navigate('MovieDetails', {
                          id: item.id,
                          isTvShow: activeTab == 'Movies' ? false : true,
                        })
                      }
                      item={item}
                      data={item}
                      image={item.poster_path}
                      index={index}
                      type={activeTab}
                    />
                  </View>
                );
              }}
              numColumns={2}
              centerContent={true}
              keyExtractor={item => item.id}
            />
          </View>
        ) : (
          <View style={{alignItems: 'center', alignItems: 'center',height: '100%', paddingBottom: 150}}>
            <FlatList
              data={searchtxt == '' ? tvShows : searchTvShow}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      alignSelf: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Card
                      onPress={() =>
                        props.navigation.navigate('MovieDetails', {
                          id: item.id,
                          isTvShow: activeTab == 'Movies' ? false : true,
                        })
                      }
                      item={item}
                      data={item}
                      image={item.poster_path}
                      index={index}
                      type={activeTab}
                    />
                  </View>
                );
              }}
              numColumns={2}
              centerContent={true}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FindingScreen;
