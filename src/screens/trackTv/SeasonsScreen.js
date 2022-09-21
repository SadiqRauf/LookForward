import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleGradientProgressbarView from 'react-native-simple-gradient-progressbar-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SeasonListCard from '../../components/SeasonListCard';
import { Backdrop, movie_Poster, TMDB_API_KEY } from '../../config/constant';
import Loader from '../../components/Loader';
import { Colors } from '../../config/Colors';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTvShows,
  storeTvEpisode,
  selectEpiData,
  storeSelectedData,
  storeAllData,
} from '../../redux/reducers/auth';
import Loading from '../../components/Loading';

const SeasonsScreen = props => {
  const { id, seasonNo, selectAll, unselectAll, ep_count } = props.route?.params;
  const [activeTab, setActiveTab] = useState('Cast & Crew');
  const [episodes, setEpisodes] = useState([]);
  const [loader, setLoader] = useState(false);
  const [seasonData, setSeasonData] = useState(false);
  const [reduxSeasons, setReduxSeasons] = useState([]);
  const dispatch = useDispatch();
  const selectedEpisodes = useSelector(selectTvShows);
  const _selectEpiData = useSelector(selectEpiData);
  const [totalEpi, setTotalEpi] = useState(0);
  const [watchedEpi, setWatchedEpi] = useState(0);
  const [oneProgress, setoneProgress] = useState(0.0);
  const [progress, setProgress] = useState(0.0);
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectText, setSelectText] = useState('Select All');
  const [localUnselect, setLocalUnselect] = useState(false);
  const [select, setSelect] = useState(false);
  const [loaders, setloaders] = useState(false);
  const [press, setpress] = useState(false);

  useEffect(
    () => {
      getTvShow();
    },
    [props],
    [selectedAll],
    [localUnselect],
  );

  useEffect(() => {
    setProgressBarData();
  });
  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('focus', () => {
  //     //  if(localUnselect===false){
  //     if (selectAll) {
  //       setSelectText('Select All');
  //       setSelectedAll(true);
  //       setLocalUnselect(false);
  //     } else if (ep_count == totalEpi) {
  //       if (unselectAll) {
  //         setSelectText('Unselect All');
  //         setSelectedAll(false);
  //         setLocalUnselect(true);
  //       }
  //     }

  //     //  }
  //   });
  //   return unsubscribe;
  // }, [props.navigation]);

  const setProgressBarData = () => {
    let _oneProgress = 1 / totalEpi;

    if (_oneProgress !== Infinity) {
      let _checkExisting = _selectEpiData.filter(x => x.seasonId == seasonNo && x.tvId == id);
      // let _checkExisting = _selectEpiData.filter(x => x.seasonId == seasonNo);
      let _p = 0;
      _p = parseFloat(_checkExisting.length) * parseFloat(_oneProgress);
      if (_checkExisting.length === 0) {
        setProgress(0);
        setWatchedEpi(0);
      } else {
        setProgress(_p);
        setWatchedEpi(_checkExisting.length);
      }
      if (_checkExisting.length > 0) {
        setSelectText('Unselect All');
      } else {
        setSelectText('Select All');
      }
    }
  };

  const getTvShow = async () => {
    // console.log(seasonNo, 'udddd', id, '.....TMDB_API_KEY', TMDB_API_KEY);
    setLoader(true);

    await axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}/season/${seasonNo}?api_key=${TMDB_API_KEY}&language=en-US`,
      )
      .then(async response => {
        setSeasonData(response.data);
        // console.log('datttatattatt,respon', response.data);
        setEpisodes(response.data.episodes);
        setTotalEpi(response.data.episodes.length);
        setLoader(false);
        await dispatch(storeTvEpisode({ data: response.data, tvShowId: id }));
      })
      .catch(error => {
        console.log('movies', error);
        setLoader(false);
      });
  };

  const selectAllPress = () => {
    if (selectText == 'Select All') {
      setSelectText('Unselect All');
      setSelectedAll(true);
      setLocalUnselect(false);
    } else {
      setSelectText('Select All');
      setSelectedAll(false);
      setLocalUnselect(true);
    }
  };

  const letText = item => {
    let _checkExisting = _selectEpiData.filter(x => x.episodeId == item.id);
    if (_checkExisting.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const checkifSelectAllPressed = () => {
    setloaders(true);
    for (let i = 0; i < episodes.length; i++) {
      if (selectText === 'Unselect All') {
        setSelectText('Select All');
        dispatch(
          storeAllData({
            tvId: id,
            seasonId: seasonNo,
            episodeId: episodes[i].id,
            isAdded: false,
          }),
        );
        setSelect(false);
      }
      if (selectText === 'Select All') {
        setSelectText('Unselect All');
        dispatch(
          storeAllData({
            tvId: id,
            seasonId: seasonNo,
            episodeId: episodes[i].id,
            isAdded: false,
          }),
        );
        setSelect(false);
        dispatch(
          storeAllData({
            tvId: id,
            seasonId: seasonNo,
            episodeId: episodes[i].id,
            isAdded: true,
          }),
        );
        setSelect(true);
      }
      if (i == episodes.length - 1) {
        setloaders(false);
      }
    }
  };

  const checkifSelectAllPressedNew = () => {
    setloaders(true);
    let Listselected = [];
    let unSelected = [..._selectEpiData];
    let add = true;
    for (let i = 0; i < episodes.length; i++) {
      if (selectText === 'Unselect All') {
        add = false;
        let index = unSelected.findIndex(
          obj => obj.episodeId === episodes[i].id,
        );
        if (index >= 0) {
          unSelected.splice(index, 1);
        }
      }
      if (selectText === 'Select All') {
        add = true;
        Listselected.push({
          tvId: id,
          seasonId: seasonNo,
          episodeId: episodes[i].id,
          isAdded: true,
        });
      }
      if (i == episodes.length - 1) {
        if (selectText === 'Unselect All') {
          setSelectText('Select All');
        } else {
          setSelectText('Unselect All');
        }
        dispatch(
          storeAllData({
            dataList: add ? Listselected : unSelected,
            isAdded: add,
          }),
        );
        setloaders(false);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 60,
          width: '100%',
          backgroundColor: Colors.backgroundColor,
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" color={'#fff'} size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setloaders(true);
            setTimeout(() => {
              checkifSelectAllPressedNew();
            }, 600);
          }}>
          <Text style={{ fontSize: 17, fontWeight: '600', color: '#fff' }}>
            {selectText}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.topView}>
        <View style={{ flex: 0.82 }}>
          <SimpleGradientProgressbarView
            style={styles.box}
            fromColor="#877bff"
            toColor="#f866ff"
            progress={progress}
            maskedCorners={[1, 1, 1, 1]}
            cornerRadius={7.0}
          />
        </View>
        <View style={{ flex: 0.18, alignItems: 'center' }}>
          <Text style={styles.text}>
            {watchedEpi}/{totalEpi}
          </Text>
        </View>
      </View>

      <FlatList
        data={episodes}
        renderItem={({ item, index }) => {
          return (
            <>
              <View style={styles.mainCard}>
                <View style={styles.textView}>
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.textDes}>{item.air_date}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    const selectedEpisod =
                      _selectEpiData.filter(x => x.episodeId == item.id)
                        .length > 0;
                    dispatch(
                      storeSelectedData({
                        tvId: id,
                        seasonId: seasonNo,
                        episodeId: item.id,
                        isAdded: !selectedEpisod,
                      }),
                    );
                  }}
                  style={[
                    _selectEpiData.filter(x => x.episodeId == item.id).length >
                      0
                      ? styles.radioBtn
                      : styles.button,
                  ]}>
                  {_selectEpiData.filter(x => x.episodeId == item.id).length >
                    0 ? (
                    <MaterialCommunityIcons
                      name="check"
                      size={15}
                      color={Colors.white}
                      style={{ alignSelf: 'center' }}
                    />
                  ) : null}
                </TouchableOpacity>
              </View>
            </>
            // <SeasonListCard
            //   item={item}
            //   tvId={id}
            //   isSelected={letText(item)}
            //   seasonId={seasonNo}
            //   selectedAll={selectedAll}
            //   unselectedAll={localUnselect === true ? true : false}
            //   selectBool={select}
            // />
          );
        }}
        keyExtractor={item => item.id}
      />
      <Loading modalVisible={loaders} />
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    width: '85%',
    height: 10,
    borderColor: Colors.grey,
    borderWidth: 5,
    borderRadius: 20,
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    // alignSelf: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  text: {
    color: Colors.grey,
    marginLeft: 10,
  },
  mainCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    marginHorizontal: 20,

    borderColor: Colors.grey,
    borderBottomWidth: 1,
  },
  button: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderColor: Colors.white,
    borderWidth: 1,
    marginEnd: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioBtn: {
    height: 20,
    width: 20,
    borderRadius: 10,
    marginEnd: 7,
    backgroundColor: Colors.appColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textView: {},
  textDes: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 10,
  },
});
export default SeasonsScreen;
