import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

const dbName = "mathLearningApp.db";
let db;

export const initializeDatabase = async () => {
  const dbUri = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  // Usuwanie bazy danych, jeśli istnieje (Do testowania aplikacji)
  const dbInfo = await FileSystem.getInfoAsync(dbUri);
  if (dbInfo.exists) {
    await FileSystem.deleteAsync(dbUri);
  }

  db = await SQLite.openDatabaseAsync(dbName);

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT
    );
    CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY NOT NULL,
      categoryId INTEGER,
      title TEXT,
      progress INTEGER DEFAULT 0,
      FOREIGN KEY (categoryId) REFERENCES categories (id)
    );
    CREATE TABLE IF NOT EXISTS lesson_steps (
      id INTEGER PRIMARY KEY NOT NULL,
      lessonId INTEGER,
      stepNumber INTEGER,
      description TEXT,
      explanation TEXT,
      FOREIGN KEY (lessonId) REFERENCES lessons (id)
    );
    CREATE TABLE IF NOT EXISTS quizzes (
      id INTEGER PRIMARY KEY NOT NULL,
      lessonId INTEGER,
      question TEXT,
      FOREIGN KEY (lessonId) REFERENCES lessons (id)
    );
    CREATE TABLE IF NOT EXISTS quiz_options (
      id INTEGER PRIMARY KEY NOT NULL,
      quizId INTEGER,
      option TEXT,
      isCorrect INTEGER,
      FOREIGN KEY (quizId) REFERENCES quizzes (id)
    );
    INSERT OR IGNORE INTO categories (id, name) VALUES
      (1, 'Statystyka'),
      (2, 'Algebra Liniowa'),
      (3, 'Całki'),
      (4, 'Matematyka Dyskretna');
    INSERT OR IGNORE INTO lessons (id, categoryId, title) VALUES
      (1, 1, 'Lekcja 1: Wstęp do statystyki'),
      (2, 1, 'Lekcja 2: Analiza danych statystycznych'),
      (3, 2, 'Lekcja 1: Wstęp do algebry liniowej'),
      (4, 2, 'Lekcja 2: Zaawansowana algebra liniowa');
    INSERT OR IGNORE INTO lesson_steps (id, lessonId, stepNumber, description, explanation) VALUES
    (1, 1, 1, 'Czym jest statystyka', 'Statystyka to nauka zajmująca się zbieraniem, analizą, interpretacją i prezentacją danych.'),
    (2, 1, 2, 'Podstawowe pojęcia statystyki', 'W statystyce podstawowe pojęcia obejmują populację, próbę, średnią, medianę i wariancję.'),
    (3, 1, 3, 'Metody zbierania danych', 'Dane można zbierać za pomocą różnych metod, takich jak ankiety, eksperymenty i obserwacje.'),
    (4, 1, 4, 'Analiza danych', 'Analiza danych statystycznych obejmuje metody opisowe i inferencyjne, które pomagają w wyciąganiu wniosków na temat populacji na podstawie próbki.'),
    (5, 1, 5, 'Prezentacja danych', 'Dane mogą być prezentowane za pomocą tabel, wykresów i diagramów, co ułatwia ich interpretację.'),
    (6, 2, 1, 'Analiza regresji', 'Analiza regresji jest metodą statystyczną do badania związków między zmiennymi.'),
    (7, 2, 2, 'Testowanie hipotez', 'Testowanie hipotez to proces weryfikacji założeń dotyczących populacji na podstawie próby danych.');
    INSERT OR IGNORE INTO quizzes (id, lessonId, question) VALUES
    (1, 1, 'Czym zajmuje się statystyka?'),
    (2, 1, 'Które z poniższych jest podstawowym pojęciem statystyki?'),
    (3, 1, 'Jakie metody zbierania danych są wykorzystywane w statystyce?');
  INSERT OR IGNORE INTO quiz_options (id, quizId, option, isCorrect) VALUES
    (1, 1, 'Zbieraniem, analizą, interpretacją i prezentacją danych.', 1),
    (2, 1, 'Badaniem związków algebraicznych.', 0),
    (3, 1, 'Tworzeniem programów komputerowych.', 0),
    (4, 2, 'Populacja, próba, średnia, mediana, wariancja.', 1),
    (5, 2, 'Funkcja, zmienna, równanie.', 0),
    (6, 2, 'Liczba zespolona, macierz, wektor.', 0),
    (7, 3, 'Ankiety, eksperymenty, obserwacje.', 1),
    (8, 3, 'Obliczenia algebraiczne, dowody matematyczne.', 0),
    (9, 3, 'Tworzenie algorytmów, programowanie.', 0);
  `);
};

export const getCategories = async () => {
  const result = await db.getAllAsync("SELECT * FROM categories;");
  return result;
};

export const getLessonsByCategory = async (categoryId) => {
  const result = await db.getAllAsync(
    "SELECT * FROM lessons WHERE categoryId = ?;",
    [categoryId]
  );
  return result;
};

export const getLesson = async (lessonId) => {
  const result = await db.getFirstAsync("SELECT * FROM lessons WHERE id = ?;", [
    lessonId,
  ]);
  return result;
};

export const getLessonSteps = async (lessonId) => {
  const result = await db.getAllAsync(
    "SELECT * FROM lesson_steps WHERE lessonId = ? ORDER BY stepNumber;",
    [lessonId]
  );
  return result;
};

export const getQuizByLesson = async (lessonId) => {
  const result = await db.getAllAsync(
    "SELECT * FROM quizzes WHERE lessonId = ?;",
    [lessonId]
  );
  return result;
};

export const getQuizOptions = async (quizId) => {
  const result = await db.getAllAsync(
    "SELECT * FROM quiz_options WHERE quizId = ?;",
    [quizId]
  );
  return result;
};

export const updateLessonProgress = async (lessonId, progress) => {
  await db.runAsync("UPDATE lessons SET progress = ? WHERE id = ?;", [
    progress,
    lessonId,
  ]);
};
