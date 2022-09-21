import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Colors } from '../../config/Colors';
import CountdownCard from '../../components/CountdownCard';
import {
  deleteMultipleMovies,
  deletemultipleTvShows,
  selectedMovies,
  selectTvShows,
  selectEpiData,
} from '../../redux/reducers/auth';
import TrackerCard from '../../components/TrackerCard';
import Header from '../../components/ProfileHeader';

const TrackTv = props => {
  const [editCard, setEditCard] = useState(false);
  const [moviesData, setMoviesData] = useState([]);
  const [tvShowData, setTvShowData] = useState([]);
  const [isSelect, setIsSelect] = useState(true);
  const selectedMoviesdata = useSelector(selectedMovies);
  const selectedTvShowdata = useSelector(selectTvShows);
  const _selectEpiData = useSelector(selectEpiData);

  const [totalEpi, settotalEpi] = useState(0);
  const [watchedEpi, setWatchedEpi] = useState(0);
  const [oneProgress, setoneProgress] = useState(0.0);
  const [progress, setprogress] = useState(0.0);

  useEffect(() => {
    //  setprogressbardata();
    // console.log(selectedTvShowdata.seasons);
  });

  const getWatched = item => {
    let _SubcatData = [];
    let _checkExisting = _selectEpiData.filter(x => x.tvId == item.id);
    let _tvData = _checkExisting.map(({ seasonId }) => ({
      seasonId,
    }));
    _tvData.forEach(obj => {
      if (!_SubcatData.some(o => o.seasonId === obj.seasonId)) {
        _SubcatData.push({ ...obj });
      }
    });
    return _SubcatData.length;
  };

  const dispatch = useDispatch();
  const onAddMovies = _item => {
    setMoviesData([...moviesData, _item]);
  };
  const onRemoveMovie = (_item, _index) => {
    moviesData.splice(_index, 1);
  };

  const onAddTvShow = _item => {
    setTvShowData([...tvShowData, _item]);
  };
  const onRemoveTvShow = (_item, _index) => {
    tvShowData.splice(_index, 1);
  };
  const onDeleteMovies = async () => {
    let myArr = [];
    let tvArr = [];
    function getDifference(array1, array2) {
      return array1.filter(object1 => {
        return !array2.some(object2 => {
          return object1.id === object2.id;
        });
      });
    }
    function getTvDifference(array1, array2) {
      return array1.filter(object1 => {
        return !array2.some(object2 => {
          return object1.id === object2.id;
        });
      });
    }

    tvArr = getTvDifference(selectedTvShowdata, tvShowData);
    myArr = getDifference(selectedMoviesdata, moviesData);
    await dispatch(deleteMultipleMovies(myArr));
    await dispatch(deletemultipleTvShows(tvArr));
    setEditCard(!editCard);
  };
  const onDeleteTvShow = async () => {
    let tvArr = [];
    function getTvDifference(array1, array2) {
      return array1.filter(object1 => {
        return !array2.some(object2 => {
          return object1.id === object2.id;
        });
      });
    }
    tvArr = getTvDifference(selectedTvShowdata, tvShowData);
    console.log(tvArr.length, 'data...', tvArr);
    await dispatch(deletemultipleTvShows(tvArr));
  };

  return (
    <SafeAreaView style={styles.sContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.backgroundColor}
      />
      <Header name="TV Tracker" />
      <View style={styles.container}>
        <FlatList
          data={selectedTvShowdata}
          renderItem={({ item, index }) => {

            console.log('item.seasons.length', item.seasons);

            return (
              <TrackerCard
                navigation={props.navigation}
                image={item.poster_path}
                data={selectedTvShowdata}
                seasonLen={item.seasons ? item.seasons.length : 0}
                name={item.name}
                item={item}
                index={index}
                watchedEpi={getWatched(item)}
              />
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export const styles = {
  container: {
    flex: 1,
    backgroundColor: '#000',
    // paddingHorizontal: 15,
  },
  sContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  header: {
    backgroundColor: Colors.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 50,
    alignItems: 'center',
  },
  moviesCard: {
    backgroundColor: Colors.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 55,
    alignItems: 'center',
    marginTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  scroll: { paddingHorizontal: 10, marginBottom: 10 },
  gamesCard: {
    backgroundColor: Colors.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 55,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10,
  },
  leftTab: {
    flex: 0.5,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  moreText: {
    color: Colors.appColor,
    fontSize: 18,
    fontWeight: '500',
  },
  tabText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  rightTab: {
    flex: 0.5,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
};

export default TrackTv;
