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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { Colors } from '../../config/Colors';
import Header from '../../components/Header';
import { Backdrop, movie_Poster, TMDB_API_KEY } from '../../config/constant';
import Loader from '../../components/Loader';
import SeasonsCard from '../../components/SeasonsCard';
import { storeTvSeason } from '../../redux/reducers/auth';

import { storeSelectedData, selectEpiData } from '../../redux/reducers/auth';


const DetailsTv = props => {
  const { id } = props.route?.params;
  const [activeTab, setActiveTab] = useState('Cast & Crew');
  const [tvShowDetails, setTvShowDetails] = useState('');
  const [loader, setLoader] = useState(false);
  const [seasons, setSeasons] = useState(false);
  const dispatch = useDispatch();
  const _selectEpiData = useSelector(selectEpiData);
  const [selectedAll, setselectedAll] = useState(false);


  useEffect(() => {
    console.log('DetailsTvScreen');
    getTvShow();
  }, [props]);

  const getTvShow = async () => {
    setLoader(true);
    await axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}&language=en-US`,
      )
      .then(async response => {
        await dispatch(storeTvSeason(response.data));
        setTvShowDetails(response.data);
        // console.log('tv_data');
        // console.log(id, 'gggggg', response.data);
        setSeasons(response.data.seasons);
        console.log(response.data.seasons);

        setLoader(false);
      })
      .catch(error => {
        console.log('movies', error);
        setLoader(false);
      });
  };

  const Tags = ({ name }) => {
    return (
      <TouchableOpacity style={styles.tag}>
        <Text style={{ color: Colors.white }}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const letText = item => {
    let _checkExisting = _selectEpiData.filter(
      x => x.seasonId == item.season_number && x.tvId === id,
    );
    let _cnt = _checkExisting.length;
    if (_checkExisting.length > 0) {
      return _cnt;
    } else {
      return 0;
    }
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
        isTvShow={true}
        data={tvShowDetails}
      />
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Image
              source={{
                uri: `${Backdrop}${tvShowDetails.backdrop_path}`,
              }}
              style={{ height: 250, width: '100%' }}
            />
          </View>

          <View style={{ paddingHorizontal: 15 }}>
            <View style={{ marginTop: 10, }}>
              <Text style={styles.title}>{tvShowDetails.name}</Text>
              <Text style={styles.date}>{tvShowDetails.first_air_date}</Text>
              <Text style={styles.date}>{'2h 2m  PG-13'}</Text>
            </View>
            <View style={{ marginTop: 10, }}>
              <Text style={styles.description}>{tvShowDetails.overview}</Text>
            </View>
            <Text style={styles.title}>{'Seasons'}</Text>
            <FlatList
              data={seasons}
              renderItem={({ item, index }) => {
                return (
                  <SeasonsCard
                    navigation={props.navigation}
                    item={item}
                    tvId={id}
                    watchedEpi={letText(item)}
                    season_number={item.season_number}
                  />
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

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
export default DetailsTv;
