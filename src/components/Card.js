import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Colors} from '../config/Colors';
import {movie_Poster} from '../config/constant';
import {useSelector, useDispatch} from 'react-redux';
import {
  deleteMovies,
  deleteTvShow,
  selectedMovies,
  selectTvShows,
  storeMovies,
  storeTvShow,
} from '../redux/reducers/auth';

const Card = props => {
  const [addToCountdown, setAddToCountdown] = useState();
  const [addTVCountdown, setAddTvCountdown] = useState();
  const selectedMoviesData = useSelector(selectedMovies);
  const selectedTVShowData = useSelector(selectTvShows);
  const dispatch = useDispatch();

  useEffect(() => {
    getMoviesfun();
  }, [props]);
  useEffect(() => {
    getTvShowsfun();
  }, [props]);

  const getMoviesfun = async () => {
    let Array = await selectedMoviesData.filter(
      item => item.id == props.item.id,
    );
    setAddToCountdown(Array.length > 0 ? true : false);
  };

  const getTvShowsfun = async () => {
    let Array = await selectedTVShowData.filter(
      item => item.id == props.item.id,
    );
    setAddTvCountdown(Array.length > 0 ? true : false);
  };

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{alignItems: 'center', padding: 10}}>
      <Image
        source={{
          uri: `${movie_Poster}${props.image}`,
        }}
        style={{height: 230, width: 150, borderRadius: 10}}
      />

      <TouchableOpacity
        onPress={async () => {
          if (props.type == 'Movies') {
            if (!addToCountdown) {
              await dispatch(storeMovies(props.item));
            } else {
              await dispatch(deleteMovies(props.item.id));
            }
          } else {
            if (!addTVCountdown) {
              await dispatch(storeTvShow(props.item));
            } else {
              await dispatch(deleteTvShow(props.item.id));
            }
          }
          setAddToCountdown(!addToCountdown);
          setAddTvCountdown(!addTVCountdown);
        }}
        style={styles.save}>
        {addToCountdown == true || addTVCountdown == true ? (
          <MaterialCommunityIcons name="check" size={25} color={Colors.white} />
        ) : (
          <MaterialCommunityIcons name="plus" size={25} color={Colors.white} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  save: {
    height: 40,
    width: 40,
    borderRadius: 25,
    backgroundColor: Colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 18,
    bottom: 18,
  },
});
