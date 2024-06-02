import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
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
    let newProgress = Math.max(((newStep) / steps.length) * 100, 100); // Obliczenie nowego postępu

    setCurrentStep(newStep);
    setProgress(newProgress);
    
    await updateLessonProgress(lessonId, newProgress); // Aktualizacja postępu lekcji
  };

  if (!lesson || steps.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Pracę nad tą lekcją są w toku!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.description}>{steps[currentStep]?.description}</Text>
        <Text style={styles.explanation}>{steps[currentStep]?.explanation}</Text>
        <Button
          title="Next"
          onPress={handleNextStep}
          disabled={currentStep >= steps.length - 1}
        />
        {currentStep >= steps.length - 1 && (
          <View key={lessonId} style={styles.lessonContainer}>
            <Text style={styles.explanation}>Gratulacje! Ukończyłeś lekcję, przejdź do quizu</Text>
            <Button
              title="Start Quiz"
              onPress={() => navigation.navigate('Quiz', { lessonId })}
            />
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
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  explanation: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  lessonContainer: {
    marginTop: 10,
  },
});

export default LessonDetailScreen;
