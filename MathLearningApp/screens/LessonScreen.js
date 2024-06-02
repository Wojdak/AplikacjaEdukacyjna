import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getLessonsByCategory } from '../repository/Repository';

const LessonScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId } = route.params; // Odczytanie id kategorii z parametrów nawigacji

  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => { // Funkcja pobierająca lekcje z bazy danych
      const result = await getLessonsByCategory(categoryId);
      setLessons(result);
    };
    fetchLessons();
  }, [categoryId]);


  if (lessons.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Pracę nad tą sekcją są w toku!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista lekcji</Text>
      {lessons.map((lesson) => (
        <View key={lesson.id} style={styles.lessonContainer}>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          <Text>Postęp: {lesson.progress}%</Text>
          <Button
            title={lesson.progress === 100 ? "Lekcja zakończona" : "Zacznij lekcję"}
            onPress={() =>
              lesson.progress === 100 ? null : navigation.navigate('LessonDetail', { categoryId, lessonId: lesson.id, })
            }
            disabled={lesson.progress === 100}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lessonContainer: {
    marginBottom: 20,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LessonScreen;
