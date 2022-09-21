import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import SimpleGradientProgressbarView from 'react-native-simple-gradient-progressbar-view';
import React, { useState, useEffect } from 'react';
import { Colors } from '../config/Colors';
import { movie_Poster, TMDB_API_KEY } from '../config/constant';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import axios from 'axios';

const TrackerCard = props => {
  const [totalEpi, settotalEpi] = useState(0);
  const [watchedEpi, setWatchedEpi] = useState(0);
  const [oneProgress, setoneProgress] = useState(0.0);
  const [progress, setprogress] = useState(0.0);
  const [unWatched, setUnWatched] = useState(0)

  const setprogressbardata = (watchedEpi) => {
    // let totalEpi = props.item?.seasons?.length;
    // settotalEpi(totalEpi);
    let _oneProgress = 1 / parseInt(totalEpi);
    /**/
    if (_oneProgress !== Infinity) {
      let _p = 0;
      _p = parseFloat(props.watchedEpi) * parseFloat(_oneProgress);

      if (props.watchedEpi === 0) {
        setprogress(0);
        setWatchedEpi(0);
        setUnWatched(0)
      } else {
        setprogress(_p);
        setWatchedEpi(props.watchedEpi);
        setUnWatched(watchedEpi - props.watchedEpi)
      }
    }
  };
  useEffect(() => {
    // setprogressbardata();
    getTvShow()
  });

  useFocusEffect(
    useCallback(() => {
    }, [])
  )

  const getTvShow = async () => {
    try {
      await axios
        .get(
          `https://api.themoviedb.org/3/tv/${props?.item?.id}?api_key=${TMDB_API_KEY}&language=en-US`,
        )
        .then(async response => {
          console.log('response.data.seasons', response.data.seasons);
          settotalEpi(response.data.seasons.length)
          setprogressbardata(response.data.seasons.length)
        })
        .catch(error => {
          console.log('movies', error);
        });
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        props.navigation.navigate('DetailsTv', {
          id: props?.item?.id,
          SID: props?.item?.seasons?.id,
        })
      }>
      <View>
        <Image
          source={{
            uri: `${movie_Poster}${props.image}`,
          }}
          style={{ height: 80, width: 60, borderRadius: 7 }}
        />
      </View>
      <View
        style={{
          height: 100,
          borderBottomWidth: 0.4,
          borderColor: Colors.grey,
          justifyContent: 'center',
          paddingLeft: 10,
        }}>
        <Text style={styles.tabText}>{props.name}</Text>
        {/* <Text style={styles.tabText}>{props.name}</Text> */}
        <View style={styles.prograssView}>
          <SimpleGradientProgressbarView
            style={styles.box}
            fromColor="#877bff"
            toColor="#f866ff"
            progress={progress}
            maskedCorners={[1, 1, 1, 1]}
            cornerRadius={7.0}
          />
          <Text style={styles.episodeNo}>
            {watchedEpi}/{totalEpi}
          </Text>
        </View>
        <View style={styles.prograssView}>
          <Text style={styles.episodeText}>{'Episode info'}</Text>
          <Text style={styles.episodeNo}>{`${unWatched} left`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TrackerCard;

const styles = StyleSheet.create({
  container: {
    height: 100,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginVertical: 10,
  },

  tabText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
  },

  box: {
    width: 200,
    height: 10,
    borderColor: Colors.grey,
    borderWidth: 5,
    borderRadius: 20,
  },
  prograssView: {
    flexDirection: 'row',
    margin: 3,
    alignItems: 'center',
  },
  episodeNo: {
    color: Colors.grey,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  episodeText: {
    backgroundColor: Colors.grey,
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  episodeLeft: {},
});
