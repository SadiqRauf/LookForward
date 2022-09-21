import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import SimpleGradientProgressbarView from 'react-native-simple-gradient-progressbar-view';
import { Colors } from '../config/Colors';
import { selectTvShows, storeEpisode, storeSelectedData, selectEpiData } from '../redux/reducers/auth';

const SeasonListCard = props => {
  const [select, setSelect] = useState(false);
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();
  const selectedEpisodes = useSelector(selectTvShows);
  const _selectEpiData = useSelector(selectEpiData);



  // useEffect(() => {
  //   if (props.selectedAll == true || props.unselectedAll == true) {
  //     checkifSelectAllPressed();
  //   } else {
  //     setSelect(props.isSelected);
  //   }
  // }, [props.selectedAll]);



  const checkIfAdded = () => {
    let _checkExisting = _selectEpiData.filter(x => x.episodeId == props.item.id);
    if (_checkExisting.length > 0) {
      setSelect(!select);
    }
  }

  return (
    <View style={styles.mainCard}>
      <View style={styles.textView}>
        <Text style={styles.text}>{props.item.name}</Text>
        <Text style={styles.textDes}>{props.item.air_date}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          dispatch(
            storeSelectedData({
              tvId: props.tvId,
              seasonId: props.seasonId,
              episodeId: props.item.id,
              isAdded: !select,
            }),
          );
          setSelect(!select);
        }}
        style={[props.selectBool == true ? styles.radioBtn : styles.button]}>
        {props.selectBool == true ? (
          <MaterialCommunityIcons
            name="check"
            size={15}
            color={Colors.white}
            style={{ alignSelf: 'center' }}
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
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
export default SeasonListCard;
