import React, { useState, useCallback, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import GetTheWeatherForecast from './get-the-weather-forecast';
import * as Location from 'expo-location';

export default function MyLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locality, setLocality] = useState(null);

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


  function renderItem (item){
    const items = item.map(item => {
      return(
        <Text>
          {item.city}

        </Text>
      )
    })
    return(
      <Text style={styles.paragraph}>
       Ваше место положение {items}
      {/* {locality.city.name} */}
      </Text>
    )
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
  },
  paragraph: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
}); 