import {
  SafeAreaView,
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Button from '../../components/Button';
import Carousel from 'react-native-snap-carousel';
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const sliderData = [
  {
    id: 0,
    image: require('../../assets/Rectangle 15.png'),
  },
  {
    id: 1,
    image: require('../../assets/image4.png'),
  },
  {
    id: 3,
    image: require('../../assets/image3.png'),
  },
  {
    id: 4,
    image: require('../../assets/image4.png'),
  },
  {
    id: 5,
    image: require('../../assets/image3.png'),
  },
];

const OnboardingScreen = ({navigation}) => {
  const renderBanner = ({item, index}) => {
    return (
      <TouchableOpacity style={{marginBottom: 10, marginTop: 20}}>
        <Image
          style={{
            height: 280,
            width: 180,
            borderRadius: 10,
          }}
          source={item.image}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.titleContainer}>
        <Text style={styles.title}>
          {'Track your most anticipated title'}
        </Text>
      </View>

      <View style={{paddingVertical:10}}>
        <Carousel
          data={sliderData}
          renderItem={renderBanner}
          sliderWidth={windowWidth}
          itemWidth={190}
          loop={true}
          layout={'default'}
          autoplay
          sliderHeight={100}
          inactiveSlideOpacity={1}
          inactiveSlideScale={0.9}
          activeSlideAlignment={'center'}
        />
      </View>
      <Button onPress={()=>navigation.navigate("BottomTabs")} backgroundColor={'#1870cd'} title={'Continue'} />
     
    </SafeAreaView>
  );
};

export default OnboardingScreen;
