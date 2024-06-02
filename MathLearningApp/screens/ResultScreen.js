import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { score } = route.params; // Pobranie wyniku z parametrów routingu

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wynik quizu!</Text>
      <Text style={styles.text}>Odpowiedziałeś dobrze na: {score} pytania</Text>
      <Button title="Powrót do ekranu startowego" onPress={() => navigation.navigate('MainMenu')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    marginVertical: 20,
  },
});

export default ResultScreen;
