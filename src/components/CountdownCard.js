import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import React, {useState} from 'react';
import {Colors} from '../config/Colors';
import {movie_Poster} from '../config/constant';
import {useSelector, useDispatch} from 'react-redux';
import {selectedMovies, selectTvShows} from '../redux/reducers/auth';

const CountdownCard = props => {
  const [select, setSelect] = useState(false);
  const selectedTvShowdata = useSelector(selectTvShows);
  const selectedMoviesdata = useSelector(selectedMovies);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor:
            select == true ? Colors.selectedCardBg : Colors.backgroundColor,
          borderBottomLeftRadius:
            props.index == selectedTvShowdata.length - 1 ||
            props.index == selectedMoviesdata.length - 1
              ? 10
              : 0,
          borderBottomRightRadius:
            props.index == selectedTvShowdata.length - 1 ||
            props.index == selectedMoviesdata.length - 1
              ? 10
              : 0,
        },
      ]}>
      {props.EditCard == true && (
        <TouchableOpacity
          onPress={() => {
            if (props.type == 'Movies') {
              if (!select) {
                // selectMovies.push(props.item);
                props.onAddMovies(props.item);

                console.log('i am pushed');
              } else {
                props.onRemoveMovie(props.item);
                console.log('i am removed');
              }
            } else {
              if (!select) {
                props.onAddTvShow(props.item);
              } else {
                props.onRemoveTvShow(props.item);
              }
            }
            setSelect(!select);
          }}
          style={[select == true ? styles.radioBtn : styles.button]}>
          {select == true ? (
            <MaterialCommunityIcons
              name="check"
              size={15}
              color={Colors.white}
              style={{alignSelf: 'center'}}
            />
          ) : null}
        </TouchableOpacity>
      )}
      <View style={{flex: 0.17}}>
        <Image
          source={{
            uri: `${movie_Poster}${props.image}`,
          }}
          style={{height: 65, width: 40, borderRadius: 7}}
        />
      </View>
      <View
        style={{
          flex: 0.5,
          height: 100,
          borderBottomWidth: 0.4,
          borderColor: Colors.grey,
          justifyContent: 'center',
        }}>
        <Text style={styles.tabText}>{props.name}</Text>
        <Text style={styles.date}>{'01/09/1993'}</Text>
      </View>
      <View style={styles.daysView}>
        <Text style={styles.moreText}>{'8'}</Text>
        <Text style={styles.moreText}>{'days'}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CountdownCard;

const styles = StyleSheet.create({
  container: {
    height: 100,

    // borderBottomWidth: 0.5,
    // borderColor: Colors.grey,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
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
  daysView: {
    flex: 0.33,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderBottomWidth: 0.4,
    borderColor: Colors.grey,
  },
  date: {
    color: Colors.grey,
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
});
