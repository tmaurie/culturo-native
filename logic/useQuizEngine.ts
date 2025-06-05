import { useEffect, useState } from "react";

export type Question = {
  question: string;
  choices: string[];
  answer: string;
  difficulty: string;
  category: string;
};

export function useQuizEngine(questionCount: number = 5) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${questionCount}`,
        );
        const data = await response.json();
        const formatted: Question[] = data.results.map((q: any) => {
          const correct = decodeHtmlEntities(q.correct_answer);
          const choices = shuffleArray([
            ...q.incorrect_answers.map((c: string) => decodeHtmlEntities(c)),
            correct,
          ]);
          return {
            question: decodeHtmlEntities(q.question),
            choices,
            answer: correct,
            difficulty: q.difficulty,
            category: decodeHtmlEntities(q.category),
          };
        });
        setQuestions(formatted);
      } catch (err) {
        console.error("Failed to fetch questions", err);
      }
    }
    fetchQuestions();
  }, [questionCount]);

  const currentQuestion = questions[currentIndex];

  const answer = (choice: string) => {
    if (answered) return;

    const correct = choice === currentQuestion.answer;
    setAnswered(true);
    setIsCorrect(correct);
    if (correct) setScore((prev) => prev + 1);
  };

  const next = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setAnswered(false);
      setIsCorrect(null);
    } else {
      setQuizFinished(true);
    }
  };

  const reset = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setIsCorrect(null);
    setQuizFinished(false);
  };

  return {
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    score,
    answered,
    isCorrect,
    quizFinished,
    answer,
    next,
    reset,
  };
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&eacute;/g, "é")
    .replace(/&uuml;/g, "ü")
    .replace(/&ouml;/g, "ö")
    .replace(/&aacute;/g, "á")
    .replace(/&oacute;/g, "ó")
    .replace(/&deg;/g, "°")
    .replace(/&hellip;/g, "…")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rsquo;/g, "’")
    .replace(/&ntilde;/g, "ñ");
}
