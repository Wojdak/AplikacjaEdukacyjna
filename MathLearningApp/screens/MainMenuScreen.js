import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MainMenuScreen = () => {
  const navigation = useNavigation();
  
  const Separator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Witaj w naszej aplikacji</Text>
      <Text style={styles.paragraph}>Gotowy do nauki?</Text>
      <Button title="Zaczynam nauke!" style={styles.button} onPress={() => navigation.navigate('Category')} />
      <Separator />
      <Button title="Ustawienia" style={styles.button} onPress={() => navigation.navigate('Settings')} />
      <Separator />
      <Button title="O nas" style={styles.button} onPress={() => navigation.navigate('About')} />
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
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 15,
  },
  separator: {
    marginBottom: 8,
  },
});

export default MainMenuScreen;