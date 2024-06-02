import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getCategories } from '../repository/Repository';

const CategoryScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => { // Funkcja pobierająca kategorie z bazy danych
      const result = await getCategories();
      setCategories(result);
    };
    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wybierz kategorię do nauki</Text>
      {categories.map((category) => (
        <View style={styles.buttonContainer} key={category.id}> 
          <Button
          key={category.id}
          title={category.name}
          onPress={() => navigation.navigate('Lesson', { categoryId: category.id })}
          />
      </View>
      ))}
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
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 8,
  },
});

export default CategoryScreen;
