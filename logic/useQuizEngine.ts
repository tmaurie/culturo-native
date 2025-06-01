import { useEffect, useState } from 'react';
import questionsData from '../data/questions.json';

export type Question = {
    question: string;
    choices: string[];
    answer: string;
};

export function useQuizEngine(questionCount: number = 5) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [quizFinished, setQuizFinished] = useState(false);

    useEffect(() => {
        const shuffled = shuffleArray([...questionsData]).slice(0, questionCount);
        const shuffledChoices = shuffled.map((q) => ({
            ...q,
            choices: shuffleArray([...q.choices]),
        }));
        setQuestions(shuffledChoices);
    }, []);

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
    return array.sort(() => Math.random() - 0.5);
}
