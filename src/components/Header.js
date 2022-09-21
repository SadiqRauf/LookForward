import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Colors} from '../config/Colors';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {
  deleteMovies,
  deleteTvShow,
  selectedMovies,
  selectTvShows,
  storeMovies,
  storeTvShow,
} from '../redux/reducers/auth';

const Header = props => {
  const [addToCountdown, setAddToCountdown] = useState(false);
  const selectedMoviesData = useSelector(selectedMovies);
  const selectedTVShowData = useSelector(selectTvShows);
  const dispatch = useDispatch();
  useEffect(() => {
    CheckInRedux(
      props.isTvShow ? selectedTVShowData : selectedMoviesData,
      props.data,
    );
  }, [props]);

  const CheckInRedux = async (reduxData, _item) => {
    let Array = await reduxData.filter(item => item.id == _item.id);
    setAddToCountdown(Array.length > 0 ? true : false);
    console.log('setAdded', Array.length > 0 ? true : false);
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={styles.back}>
        <View style={styles.leftView}>
          <Ionicons
            name="chevron-back-outline"
            size={25}
            color={Colors.appColor}
          />
          <Text style={{color: Colors.appColor, fontWeight: '700'}}>Back</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.name}>
        <Text
          numberOfLines={1}
          style={{fontSize: 16, fontWeight: '700', color: Colors.white}}>
          {'The Gray Man'}
        </Text>
      </View>
      <TouchableOpacity
        onPress={async () => {
          if (props.isTvShow == false) {
            if (!addToCountdown) {
              await dispatch(storeMovies(props.data));
            } else {
              await dispatch(deleteMovies(props.data.id));
            }
          } else {
            if (!addToCountdown) {
              await dispatch(storeTvShow(props.data));
            } else {
              await dispatch(deleteTvShow(props.data.id));
            }
          }
          setAddToCountdown(!addToCountdown);
        }}
        style={styles.back}>
        {addToCountdown == true ? (
          <MaterialCommunityIcons
            name="check"
            size={25}
            color={Colors.appColor}
          />
        ) : (
          <MaterialCommunityIcons
            name="plus"
            size={25}
            color={Colors.appColor}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
  },
  back: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
