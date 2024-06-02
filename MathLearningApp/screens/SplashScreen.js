import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainMenu');
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/math-logo.png')} style={styles.logo} />
      <Text style={styles.title}>Aplikacja Edukacyjna z Matematyki</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
