import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>O nas</Text>
      <Text style={styles.text}>Aplikacja stworzona przez studentów WSEI:</Text>
      <Text style={styles.paragraph}>Eliasz Nalepka & Jakub Wojdak</Text>
      <Image source={require('../assets/wsei-logo.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 17,
    marginBottom: 15,
  },
  logo: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
});

export default AboutScreen;
