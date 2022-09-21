import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import SimpleGradientProgressbarView from 'react-native-simple-gradient-progressbar-view';
import { Colors } from '../config/Colors';

import { storeSelectedData, selectEpiData, storeAllData, storeTvSeason } from '../redux/reducers/auth';
import axios from 'axios';
import { TMDB_API_KEY } from '../config/constant';
import Loading from './Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

const SeasonsCard = props => {
  const [select, setSelect] = useState(false);
  const [oneProgress, setoneProgress] = useState(0.0);
  const [progressBar, setProgressBar] = useState(0.0);
  const [episodes, setEpisodes] = useState([]);
  const [seasonData, setSeasonData] = useState({});
  const [totalEpi, setTotalEpi] = useState(0);
  const [loaders, setloaders] = useState(false)
  const _selectEpiData = useSelector(selectEpiData);
  const seasonDetails = useSelector(storeTvSeason)
  const dispatch = useDispatch()
  // console.log(";;;;;;;;;;;;;",progressBar)
  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('focus', () => {
  //   if (progressBar < 1) {
  //     setSelect(false);
  //   } 
  // })
  // return unsubscribe
  // }, [props.navigation]);

  // console.log('============seasonDetails========================');
  // console.log(seasonDetails.payload.user);
  // console.log('====================================');

  // useEffect(() => {
  //   setProgressBarData();
  // }, [props.watchedEpi]);

  useFocusEffect(
    useCallback(() => {
      setProgressBarData();
    }, [props])
  )

  const setProgressBarData = () => {
    let _oneProgress = 1 / parseInt(props.item?.episode_count);
    /**/
    let _p = 0;
    _p = parseFloat(props.watchedEpi) * parseFloat(_oneProgress);

    if (props.watchedEpi === 0) {
      setProgressBar(0);
    } else {
      setProgressBar(_p);
    }
  };

  // const setProgressBarData = () => {
  //   let _oneProgress = 1 / totalEpi

  //   if (_oneProgress !== Infinity) {
  //     let _checkExisting = _selectEpiData.filter(x => x.seasonId == props.seasonNo && x.tvId == id);
  //     console.clear()
  //     let _p = 0;
  //     _p = parseFloat(_checkExisting.length) * parseFloat(_oneProgress);
  //     if (_checkExisting.length === 0) {
  //       setProgressBar(0);
  //       // setWatchedEpi(0);
  //     } else {
  //       setProgressBar(_p);
  //       // setWatchedEpi(_checkExisting.length);
  //     }
  //   }
  // }



  useEffect(() => {
    if (select == true) {
      setProgressBar(1)
    } else {
      let _oneProgress = 1 / parseInt(props.item?.episode_count);
      let _p = 0;
      _p = parseFloat(props.watchedEpi) * parseFloat(_oneProgress);
      setProgressBar(_p)
    }
  }, [select])

  useEffect(() => {
    getTvShow()
  }, [])

  const getTvShow = async () => {
    // if (props.item.id && props.item.season_number) {
    try {
      await axios
        .get(
          `https://api.themoviedb.org/3/tv/${props.tvId}/season/${props.item.season_number}?api_key=${TMDB_API_KEY}&language=en-US`,
        )
        .then(async response => {
          setSeasonData(response.data);
          setEpisodes(response.data.episodes);
          setTotalEpi(response.data.episodes.length);
          // await dispatch(storeTvEpisode({ data: response.data, tvShowId: id }));
        })
        .catch(error => {
          console.log('movies', error);
        });
    }
    catch (err) {
      console.log(err);
    }
    // }
  };

  const checkifSelectAllPressedNew = () => {
    setloaders(true)
    let Listselected = []
    let unSelected = [..._selectEpiData]
    let add = true
    for (let i = 0; i < episodes.length; i++) {
      if ((props.watchedEpi == props.item?.episode_count) || (props.watchedEpi != props.item?.episode_count)) {
        console.log('if')
        add = false
        let index = unSelected.findIndex(
          obj => obj.episodeId === episodes[i].id,
        )
        if (index >= 0) {
          unSelected.splice(index, 1)
        }
      }
      if (props.watchedEpi == 0) {
        console.log('second if')
        add = true
        Listselected.push(
          {
            tvId: props.tvId,
            seasonId: props.item.season_number,
            episodeId: episodes[i].id,
            isAdded: true
          }
        )
      }
      if (i == episodes.length - 1) {
        console.log('third if')
        dispatch(
          storeAllData({
            dataList: add ? Listselected : unSelected,
            isAdded: add
          }),
        );
        setloaders(false)
      }
    }
  }

  return (
    <View style={styles.mainCard}>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          onPress={() => {
            checkifSelectAllPressedNew()
            setSelect(!select)
          }}
          style={[props.watchedEpi ? styles.radioBtn : styles.button]}
        >
          {props.watchedEpi ? (
            <MaterialCommunityIcons
              name="check"
              size={15}
              color={Colors.white}
              style={{ alignSelf: 'center' }}
            />
          ) : null}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.mainCard, { flex: 0.9 }]}
        onPress={() => {
          props.navigation.navigate('SeasonsScreen', {
            id: props.tvId,
            seasonNo: props.item.season_number,
            selectAll: select,
            unselectAll: select == true ? false : true,
            ep_count: select == true ? props.item?.episode_count : props.watchedEpi
          })
        }}>
        <Text style={styles.text}>{props.item?.name}</Text>
        {
          props.watchedEpi !== 0 ?
            <SimpleGradientProgressbarView
              style={styles.box}
              fromColor="#877bff"
              toColor="#f866ff"
              progress={progressBar}
              maskedCorners={[1, 1, 1, 1]}
              cornerRadius={7.0}
            /> : <View style={styles.boxs} />
        }
        <Text style={styles.text}>
          {props.watchedEpi}/{props.item?.episode_count}
        </Text>
        <MaterialIcons
          name="arrow-forward-ios"
          size={15}
          color={Colors.white}
          style={{ alignSelf: 'center' }}
        />
      </TouchableOpacity>
      <Loading modalVisible={loaders} />
    </View>
  );
};
const styles = StyleSheet.create({
  mainCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderColor: Colors.grey,

    // width:'100%',
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
  box: {
    width: '50%',
    height: 10,
    borderColor: Colors.grey,
    borderWidth: 5,
    borderRadius: 20,
  },
  boxs: {
    width: '45%',
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  radioContainer: { flex: 0.1, justifyContent: 'center', alignItems: 'center' },
});
export default SeasonsCard;
