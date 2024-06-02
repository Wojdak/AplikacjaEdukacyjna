import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>O nas</Text>
        <Text style={styles.text}>Aplikacja stworzona przez studentów WSEI:</Text>
        <Text style={styles.paragraph}>Eliasz Nalepka & Jakub Wojdak</Text>
        <Image source={require('../assets/wsei-logo.png')} style={styles.logo} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 18,
    color: '#444',
    textAlign: 'center',
    marginBottom: 15,
  },
  logo: {
    marginTop: 20,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default AboutScreen;
