import React, { useState, useEffect } from "react"
import { fetchQuizQuestions, QuestionState } from "../services/API"
import { Difficulty, Category } from "../enums/enums"
import {
  TOTAL_QUESTIONS,
  difficultySelections,
  categorySelections,
  COUNTDOWN,
  POINTS_DIFFICULIY,
  ScoreCalc,
} from "../QuizConfig"
import { QuestionCard } from "../components/Questioncard"
import "./PagesStyle.css"

export type AnswerType = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
  difficultySelections: string
}

export const Quiz = () => {
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState<number>(0)
  const [userAnswers, setUserAnswers] = useState<AnswerType[]>([])
  const [score, setScore] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(true)
  const [difficulty, setDifficulty] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [questionClock, setQuestionClock] = useState<boolean>(false)
  const [pauseTime, setPauseTime] = useState<boolean>(false)
  const [pauseCountDown, setPauseCountdown] = useState<number>(3)
  const [questionCountdown, setQuestionCountdown] = useState<number>(COUNTDOWN)
  const [correctAnswerInRow, setCorrectAnswerInRow] = useState<number>(0)

  //Give random value from list of categories
  const randomCategories = categorySelections.sort(() => Math.random() - 0.5)

  //For timer
  useEffect(() => {
    if (questionClock) {
      const elapsedTime: number = 0
      if (questionCountdown > elapsedTime) {
        setTimeout(() => {
          setQuestionCountdown(questionCountdown - 1)
        }, 1000)
      }
    }
  }, [questionClock, questionCountdown])

  useEffect(() => {
    if (pauseTime) {
      const elapsedTime: number = 0
      if (pauseCountDown > elapsedTime) {
        setTimeout(() => {
          setPauseCountdown(pauseCountDown - 1)
        }, 1000)
      }

      if (pauseCountDown === elapsedTime) {
        setPauseTime(false)
        setPauseCountdown(3)
      }
    }
  }, [pauseTime, pauseCountDown])

  //When starting quiz
  const startQuiz = async () => {
    setPauseTime(true)
    setNumber(0)
    setLoading(true)
    setGameOver(false)
    setQuestionClock(true)
    setQuestionCountdown(COUNTDOWN + pauseCountDown)
    if (!difficulty) {
      setDifficulty("easy")
    }

    const newGame = await fetchQuizQuestions(
      (difficulty || "easy") as Difficulty,
      category as Category
    )
    setQuestions(newGame)
    setScore(0)
    setUserAnswers([])
    setLoading(false)
  }

  //Check if answer is correct and handle score
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value

      const correct = questions[number].correctAnswer === answer

      setQuestionClock(false)

      if (correct) {
        const requiredCorrectAnswersInRow = 3

        const seconds = questionCountdown
        const difficulityPoints = POINTS_DIFFICULIY[difficulty]

        const guessedAnswers =
          correct && correctAnswerInRow >= requiredCorrectAnswersInRow

        const bonus =
          requiredCorrectAnswersInRow > 2 ? requiredCorrectAnswersInRow : 0

        setScore(
          (prev) =>
            prev + ScoreCalc(seconds, difficulityPoints, guessedAnswers, bonus)
        )

        setCategory("")
      }

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        difficultySelection: difficulty,
        correctAnswer: questions[number].correctAnswer,
      }
      //@ts-ignore
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  //To get the next question
  const handleNext = async () => {
    setPauseTime(true)
    setNumber((prev) => prev + 1)
    setQuestionClock(true)
    setQuestionCountdown(COUNTDOWN + pauseCountDown)

    const newGame = await fetchQuizQuestions(
      difficulty as Difficulty,
      category as Category
    )

    setQuestions(newGame)

    if (number === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber((prev) => prev)
    }
  }

  //Get player name value from local storage
  const player = localStorage.getItem("user")

  return (
    <div>
      {/* Sore in the end of the game */}
      {!gameOver && userAnswers.length >= TOTAL_QUESTIONS && (
        <p>Score: {score}</p>
      )}

      {pauseTime ? (
        // Countdown between questions
        <h3 className="three-sec">{pauseCountDown}</h3>
      ) : (
        <>
          <div className="player-time-container">
            {/* Show player name */}
            <h3 className="player">Player: {player}</h3>

            {!gameOver && (
              // Countdown for every question
              <h3 className="time-left">Time left: {questionCountdown}</h3>
            )}
          </div>

          {!category && userAnswers.length < TOTAL_QUESTIONS ? (
            // Select category before and during the game
            <>
              <select
                className="select"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Select Category</option>
                {randomCategories.slice(0, 3).map((selections, index) => (
                  <option value={selections.id} key={index}>
                    {selections.name}
                  </option>
                ))}
              </select>
            </>
          ) : null}
        </>
      )}

      {!difficulty && (
        // Select difficulty before the game
        <>
          <select
            className="select"
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option>Select Difficulty</option>
            {difficultySelections.map((selections, index) => (
              <option value={selections.name} key={index}>
                {selections.id}
              </option>
            ))}
          </select>
        </>
      )}

      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <>
          {difficulty && category ? (
            // Start button
            <button className="start" onClick={startQuiz}>
              Start
            </button>
          ) : null}
        </>
      ) : null}

      {/* loading befor the questions */}
      {loading ? <p>Loading question.....</p> : null}

      {/* The questions and answers */}
      {!loading && !gameOver && !pauseTime && (
        <QuestionCard
          questionNr={number + 1}
          question={questions[number].question}
          answers={questions[number].answers}
          totalQuestions={TOTAL_QUESTIONS}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
          quiestionCountDown={questionCountdown}
        />
      )}

      {/* Next question button */}
      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 &&
      category ? (
        <button className="next-btn" onClick={handleNext}>
          Next question
        </button>
      ) : null}

      {!gameOver && !loading && questionCountdown === 0 ? (
        <button className="next-btn" onClick={handleNext}>
          Next question
        </button>
      ) : null}
    </div>
  )
}
