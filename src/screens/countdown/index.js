import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {styles} from './styles';
import {Colors} from '../../config/Colors';
import CountdownCard from '../../components/CountdownCard';
import {
  deleteMultipleMovies,
  deletemultipleTvShows,
  selectedMovies,
  selectTvShows,
} from '../../redux/reducers/auth';

const CountdownScreen = props => {
  const [editCard, setEditCard] = useState(false);
  const [moviesData, setMoviesData] = useState([]);
  const [tvShowData, setTvShowData] = useState([]);
  const [isSelect, setIsSelect] = useState(true);
  const selectedMoviesdata = useSelector(selectedMovies);
  const selectedTvShowdata = useSelector(selectTvShows);
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
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flex: editCard == true ? 0.3 : 0.2}} />
          <View
            style={{position: 'absolute', left: editCard == true ? 12 : '40%'}}>
            <Text style={styles.tabText}>{'Countdown'}</Text>
          </View>
          {!editCard && (
            <TouchableOpacity onPress={() => setEditCard(!editCard)}>
              <Text style={styles.moreText}>{'Edit'}</Text>
            </TouchableOpacity>
          )}
          {editCard == true && (
            <View
              style={{
                flexDirection: 'row',
                flex: 0.32,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.moreText}>Done</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  onDeleteMovies();
                  // await dispatch(deleteMultipleMovies(moviesData)),
                  //   setEditCard(false);
                }}>
                <Text style={[styles.moreText, {color: 'red'}]}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <ScrollView style={styles.scroll}>
          <View
            style={[
              styles.moviesCard,
              {
                borderBottomLeftRadius: selectedMoviesdata.length ? 0 : 10,
                borderBottomRightRadius: selectedMoviesdata.length ? 0 : 10,
              },
            ]}>
            <Text style={styles.tabText}>{'Movies'}</Text>
          </View>
          <FlatList
            data={selectedMoviesdata}
            scrollEnabled={false}
            renderItem={({item, index}) => {
              return (
                <CountdownCard
                  navigation={props.navigation}
                  EditCard={editCard}
                  image={item.poster_path}
                  name={item.title}
                  isSelect={isSelect}
                  setIsSelect={setIsSelect}
                  item={item}
                  index={index}
                  type={'Movies'}
                  onAddMovies={item => onAddMovies(item, index)}
                  onRemoveMovie={item => onRemoveMovie(item)}
                />
              );
            }}
            keyExtractor={item => item.id}
          />

          <View
            style={[
              styles.gamesCard,
              {
                borderBottomLeftRadius: selectedTvShowdata.length ? 0 : 10,
                borderBottomRightRadius: selectedTvShowdata.length ? 0 : 10,
              },
            ]}>
            <Text style={styles.tabText}>{'Tv Shows'}</Text>
          </View>
          <FlatList
            data={selectedTvShowdata}
            renderItem={({item, index}) => {
              return (
                <CountdownCard
                  scrollEnabled={false}
                  navigation={props.navigation}
                  EditCard={editCard}
                  image={item.poster_path}
                  name={item.title}
                  isSelect={isSelect}
                  setIsSelect={setIsSelect}
                  item={item}
                  index={index}
                  type={'TvShow'}
                  onAddTvShow={item => onAddTvShow(item)}
                  onRemoveTvShow={item => onRemoveTvShow(item, index)}
                />
              );
            }}
            keyExtractor={item => item.id}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CountdownScreen;
