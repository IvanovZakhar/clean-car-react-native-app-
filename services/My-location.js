import React, { useState, useCallback, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import GetTheWeatherForecast from './get-the-weather-forecast';
import * as Location from 'expo-location';



export default function MyLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locality, setLocality] = useState(null);
  const [fontsLoaded] = useFonts({
    'RobotoMedium': require('../fonts/Roboto-Medium.ttf'),
    'RobotoRegular': require('../fonts/Roboto-Regular.ttf'),
    'RobotoLight':  require('../fonts/Roboto-Light.ttf'),
  });

  // Локация
  const {getWeather} = GetTheWeatherForecast();

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(JSON.parse(JSON.stringify(location)));
      console.log('ok')
      getWeather(location.coords.latitude, location.coords.longitude)
      .then(data => setLocality(data))
    })();
  


  }, []);


  let i = false

  function renderItem (item){
    if(item){
 
  
      // Проверка для информации о помывки авто
     item.list.map(item => {
        if( item.weather[0].main === 'Rain'){
           return i = !i
        }
      })

      return(
        <>
          <ImageBackground source={item.list[0].weather[0].main === 'Clouds' ? require('../img/rain.jpg') : require('../img/clear-weather.jpg')} resizeMode="cover" style={styles.imgStyle}>
      
            <Text style={styles.city}>  
                {item.city.name}
            </Text>
            <Text style={styles.tempNow}>  
              {`${Math.round(item.list[0].main.temp)}°`}
            </Text>
            <Text style={styles.weatherDescripthion}>  
              {item.list[0].weather[0].description}
            </Text>
            <Text style={styles.info}>  
              {i ? 'Помой машину в следующий раз' : 'Отличное время для помывки авто'}
            </Text>
          </ImageBackground>
        </>
        
   
       )
    }

   
  }
  
  const item = renderItem(locality)

  return (
   
    <View style={styles.container}>
      {item}
    </View>
 
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  imgStyle:{
    width:  Dimensions.get('window').width,
    height: Dimensions.get('window').height
    // width: Dimensions.get('window').width ,
    // height: 
  },
  city: {
    position: 'absolute',
    alignSelf: 'center',
    top: 100,
    fontFamily: 'RobotoRegular',
    fontSize: 30
  },
  tempNow:{
    position: 'absolute',
    top: 180,
    alignSelf: 'center',
    fontFamily: 'RobotoRegular',
    fontSize: 30
  },
  weatherDescripthion:{
    position: 'absolute',
    top: 230,
    alignSelf: 'center',
    fontFamily: 'RobotoLight',
    fontSize: 30
  }, 
 info:{
    position: 'absolute',
    top: 350,
    alignSelf: 'center',
    fontFamily: 'RobotoLight',
    fontSize: 25
  }
}); 