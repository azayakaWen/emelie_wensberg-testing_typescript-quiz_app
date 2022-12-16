import React, { useState } from "react"
import { fetchQuizQuestions, QuestionState } from "../services/API"
import { Difficulty } from "../enums/QuizDifficulty"
import Config, { TOTAL_QUESTIONS } from "../QuizConfig"

import QuestionCard from "../components/Questioncard"

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const Quiz = () => {
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(true)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState<number>(0)
  const [complete, setComplete] = useState<boolean>(false)
  const [difficulty, setDifficulty] = useState(Difficulty.EASY)

  const handleDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //@ts-ignore
    setDifficulty(e.target.value)
  }

  const startQuiz = async () => {
    setComplete(false)
    const new_questions = await fetchQuizQuestions(difficulty)
    setQuestions(new_questions)
    setGameOver(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value
      const correct = questions[number].correctAnswer === answer
      if (correct) setScore((prev) => prev + 1)
      const answerObject = {
        question: questions[number].question,
        correctAnswer: questions[number].correctAnswer,
        answer,
        correct,
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const handleNext = () => {
    if (number < Config.totalQuestions - 1) setNumber((prev) => prev + 1)
    else setComplete(true)
  }

  const player = localStorage.getItem("user")

  return (
    <div className="App">
      <h3>Player: {player}</h3>
      {complete && (
        <div className="complete">
          Quiz is complete <p className="score">Score: {score}</p>
        </div>
      )}

      {gameOver || complete ? (
        <>
          <p>Select Difficulty</p>
          <select value={difficulty} onChange={handleDifficulty}>
            {Object.keys(Difficulty).map((key) => (
              //@ts-ignore
              <option key={key} value={Difficulty[key]}>
                {key}
              </option>
            ))}
          </select>
          <button className="start" onClick={startQuiz}>
            Start Quiz
          </button>
        </>
      ) : null}
      {!gameOver && !complete && (
        <QuestionCard
          questionNr={number + 1}
          question={questions[number].question}
          answers={questions[number].answers}
          totalQuestions={TOTAL_QUESTIONS}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}

      {!gameOver && !complete && !!userAnswers[number] && (
        <button className="next" onClick={handleNext}>
          Next Question
        </button>
      )}
    </div>
  )
}

export default Quiz
