import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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
        <Text style={styles.loadingText}>Pracę nad tą sekcją są w toku!</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lista lekcji</Text>
      {lessons.map((lesson) => (
        <TouchableOpacity 
          key={lesson.id} 
          style={[styles.lessonContainer, lesson.progress === 100 && styles.lessonCompleted]}
          onPress={() =>
            lesson.progress === 100 ? null : navigation.navigate('LessonDetail', { categoryId, lessonId: lesson.id })
          }
          disabled={lesson.progress === 100}
          activeOpacity={1}
        >
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          <Text style={styles.progressText}>Postęp: {lesson.progress}%</Text>
          <View style={styles.buttonWrapper}>
            <Text style={[styles.buttonText, lesson.progress === 100 && styles.buttonTextDisabled]}>
              {lesson.progress === 100 ? "Lekcja zakończona" : "Zacznij lekcję"}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#888',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  lessonContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  lessonCompleted: {
    backgroundColor: '#e0e0e0',
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  progressText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  buttonWrapper: {
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: '#bbb',
  },
});

export default LessonScreen;
