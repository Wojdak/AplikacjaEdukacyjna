import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MainMenuScreen = () => {
  const navigation = useNavigation();
  
  const Separator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Witaj w naszej aplikacji</Text>
      <Text style={styles.paragraph}>Gotowy do nauki?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Category')}
        activeOpacity={1}
      >
        <Text style={styles.buttonText}>Zaczynam naukę!</Text>
      </TouchableOpacity>
      <Separator />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Settings')}
        activeOpacity={1}
      >
        <Text style={styles.buttonText}>Ustawienia</Text>
      </TouchableOpacity>
      <Separator />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('About')}
        activeOpacity={1}
      >
        <Text style={styles.buttonText}>O nas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  separator: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#1e90ff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MainMenuScreen;
