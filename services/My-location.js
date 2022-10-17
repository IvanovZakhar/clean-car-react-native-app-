import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import GetTheWeatherForecast from './get-the-weather-forecast';
import * as Location from 'expo-location';

export default function MyLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const {getWeather} = GetTheWeatherForecast();

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    let result = JSON.parse(JSON.stringify(location));
    // text = Array.from(result)
    getWeather();
    console.log(result.coords.latitude, result.coords.longitude)
 
  }

 
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
       
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
}); 