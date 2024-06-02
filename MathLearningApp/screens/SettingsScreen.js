import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert, ScrollView } from 'react-native';

const SettingsScreen = () => {
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  optionText: {
    fontSize: 20,
    color: '#666',
  },
});

export default SettingsScreen;
