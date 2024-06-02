import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getQuizByLesson, getQuizOptions } from '../repository/Repository';

const QuizScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { lessonId } = route.params; // Odczytanie id lekcji z parametrów nawigacji

  const [quiz, setQuiz] = useState([]); // Pytania quizu
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [options, setOptions] = useState([]); // Odpowiedzi do aktualnego pytania
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    const fetchQuiz = async () => { // Funkcja pobierająca quiz z bazy danych
      try {
        const quizData = await getQuizByLesson(lessonId);
        setQuiz(quizData);

        if (quizData.length > 0) {
          const optionsData = await getQuizOptions(quizData[0].id); // Pobranie odpowiedzi dla pierwszego pytania
          setOptions(optionsData);
        }
      } catch (error) {
        console.error(`Error fetching quiz: ${error}`);
      }
    };
    fetchQuiz();
  }, [lessonId]);

  const handleAnswer = async (isCorrect) => { // Funkcja obsługująca odpowiedź na pytanie
    const nextQuestion = currentQuestion + 1;

    if (isCorrect) { 
      setScore((prevScore) => prevScore + 1);
    }

    if (nextQuestion >= quiz.length) { // Jeśli nie ma więcej pytań, przejdź do ekranu wyniku
      navigation.navigate('Result', { score: isCorrect ? score + 1 : score });
    } else { // Pobranie odpowiedzi dla następnego pytania
      setCurrentQuestion(nextQuestion);
      const optionsData = await getQuizOptions(quiz[nextQuestion].id);
      setOptions(optionsData);
    }
  };

  if (quiz.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Pracę nad quizem dla tej lekcji są w toku!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{quiz[currentQuestion]?.question}</Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.optionButton}
          onPress={() => handleAnswer(option.isCorrect === 1)}
          activeOpacity={1}
        >
          <Text style={styles.optionText}>{option.option}</Text>
        </TouchableOpacity>
      ))}
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
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#888',
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
  },
  optionButton: {
    backgroundColor: '#1e90ff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  quizContainer: {
    marginBottom: 15,
  },
});

export default QuizScreen;
