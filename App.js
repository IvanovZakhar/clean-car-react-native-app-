import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import MyLocation from './services/My-location';



export default function App() {
  // const {geoposition, setGeopositon} = useState(null);
  //  useEffect(() => {
  //     const {lat, lon} = MyLocation()
     
  //  }, [])

  
  return (
    <View style={styles.container}>
      <MyLocation/>
      <StatusBar style="auto" />
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
});
