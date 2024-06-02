import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = ({ navigation }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(previousState => !previousState);
    Alert.alert('Work in progress', 'Ustawienia motywu są w trakcie opracowywania.');
  };

  const toggleNotifications = () => {
    setIsNotificationsEnabled(previousState => !previousState);
    Alert.alert('Work in progress', 'Ustawienia powiadomień są w trakcie opracowywania');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ustawienia</Text>
      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Tryb ciemny</Text>
        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
        />
      </View>
      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Powiadomienia</Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 10,
  },
  optionText: {
    fontSize: 18,
  },
});

export default SettingsScreen;
