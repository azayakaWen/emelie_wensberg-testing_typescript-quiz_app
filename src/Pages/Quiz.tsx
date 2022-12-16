import React, { useState } from "react"
import { fetchQuizQuestions, QuestionState } from "../services/API"
import { Difficulty, Category } from "../enums/enums"
import Config, { TOTAL_QUESTIONS } from "../QuizConfig"
import { Difficulties, Categories } from "../constans/constans"
import QuestionCard from "../components/Questioncard"

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

export const Quiz = () => {
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState<number>(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState<number>(0)
  const [gameOver, setGameOver] = useState(true)
  const [difficulty, setDifficulty] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState<boolean>(false)

  // const handleDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   //@ts-ignore
  //   setDifficulty(e.target.value)
  // }

  const shuffledCategories = Categories.sort(() => Math.random() - 0.5)

  const startQuiz = async () => {
    setNumber(0)
    setLoading(true)
    setGameOver(false)
    setComplete(false)

    if (!difficulty) {
      setDifficulty("easy")
    }

    const newQuestions = await fetchQuizQuestions(
      (difficulty || "easy") as Difficulty,
      category as Category
    )

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value
      const correct = questions[number].correctAnswer === answer

      if (correct) setScore((prev) => prev + 1)
      setCategory("")

      const answerObject = {
        question: questions[number].question,
        correctAnswer: questions[number].correctAnswer,
        answer,
        correct,
        questionDifficulty: difficulty,
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const handleNext = async () => {
    const newQuestions = await fetchQuizQuestions(
      difficulty as Difficulty,
      category as Category
    )

    setQuestions(newQuestions)

    if (number === Config.totalQuestions) {
      setGameOver(true)
    } else {
      setComplete(true)
    }
  }

  const player = localStorage.getItem("user")

  return (
    <div className="App">
      <h3>Player: {player}</h3>

      {!difficulty && (
        <>
          <p>Select Difficulty</p>
          <select onChange={(e) => setDifficulty(e.target.value)}>
            {Difficulties.map((options, index) => (
              <option value={options.id} key={index}>
                {options.name}
              </option>
            ))}
          </select>
        </>
      )}

      {!category && (
        <>
          <p>Select Category</p>
          <select onChange={(e) => setCategory(e.target.value)}>
            {shuffledCategories.slice(0, 3).map((options, index) => (
              <option value={options.id} key={index}>
                {options.name}
              </option>
            ))}
          </select>
        </>
      )}
      {gameOver || userAnswers.length === Config.totalQuestions ? (
        <button
          onClick={() => {
            startQuiz()
          }}
        >
          Start Quiz
        </button>
      ) : null}

      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[0].question}
          answers={questions[0].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}

      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== Config.totalQuestions - 1 ? (
        <button
          onClick={() => {
            handleNext()
          }}
        >
          Next Question
        </button>
      ) : null}
    </div>
  )
}
