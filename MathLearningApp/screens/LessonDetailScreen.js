import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getLesson, getLessonSteps, updateLessonProgress } from '../repository/Repository';

const LessonDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { lessonId } = route.params; // Odczytanie id lekcji z parametrów nawigacji

  const [lesson, setLesson] = useState(null);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchLesson = async () => { // Funkcja pobierająca lekcje z bazy danych
      const lessonData = await getLesson(lessonId);
      setLesson(lessonData);
      
      const stepsData = await getLessonSteps(lessonId); // Pobranie kroków lekcji
      setSteps(stepsData);

      const initialStep = Math.floor((lessonData.progress / 100) * stepsData.length); // Obliczenie aktualnego kroku
      setCurrentStep(initialStep); // Ustawienie aktualnego kroku
      setProgress(lessonData.progress); // Ustawienie postępu
    };
    fetchLesson();
  }, [lessonId]);

  const handleNextStep = async () => { // Funkcja obsługująca przejście do następnego kroku
    const newStep = currentStep + 1;
    let newProgress = Math.min(((newStep + 1) / steps.length) * 100, 100); // Obliczenie nowego postępu

    setCurrentStep(newStep);
    setProgress(newProgress);
    
    await updateLessonProgress(lessonId, newProgress); // Aktualizacja postępu lekcji
  };

  if (!lesson || steps.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Pracę nad tą lekcją są w toku!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.description}>{steps[currentStep]?.description}</Text>
        <Text style={styles.explanation}>{steps[currentStep]?.explanation}</Text>
        <TouchableOpacity
          style={[styles.button, currentStep >= steps.length - 1 && styles.buttonDisabled]}
          onPress={handleNextStep}
          disabled={currentStep >= steps.length - 1}
          activeOpacity={1}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        {currentStep >= steps.length - 1 && (
          <View key={lessonId} style={styles.lessonContainer}>
            <Text style={styles.explanation}>Gratulacje! Ukończyłeś lekcję, przejdź do quizu</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Quiz', { lessonId })}
              activeOpacity={1}
            >
              <Text style={styles.buttonText}>Start Quiz</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
  },
  explanation: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  lessonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#bbb',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LessonDetailScreen;