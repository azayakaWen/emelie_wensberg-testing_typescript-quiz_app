import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./Pages/Home"
import Quiz from "./Pages/Quiz"

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Quiz from Trivia API</h1>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

// const App = () => {
//   const [loading, setLoading] = useState(false)
//   const [questions, setQuestions] = useState<QuestionSate[]>([])
//   const [number, setNumber] = useState(0)
//   const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
//   const [score, setScore] = useState(0)
//   const [gameOver, setGameOver] = useState(true)

//   const startQuiz = async () => {
//     setLoading(true)
//     setGameOver(false)

//     const newQuestion = await fetchQuizQuestions(TOTAL_QUESTIONS, "hard", "SE")

//     setQuestions(newQuestion)
//     setScore(0)
//     setUserAnswers([])
//     setNumber(0)
//     setLoading(false)
//   }

//   const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
//     if (!gameOver) {
//       //user answer
//       const answer = e.currentTarget.value

//       //check valu against the correct answer
//       const correct = questions[number].correctAnswer === answer

//       if (correct) setScore((prev) => prev + 1)

//       //save answer in array of userAnswers
//       const answerObjects = {
//         question: questions[number].question,
//         answer,
//         correct,
//         correctAnswer: questions[number].correctAnswer,
//       }

//       setUserAnswers((prev) => [...prev, answerObjects])
//     }
//   }

//   const nextQuestion = () => {
//     const nextQuestion = number + 1

//     if (nextQuestion === TOTAL_QUESTIONS) {
//       setGameOver(true)
//     } else {
//       setNumber(nextQuestion)
//     }
//   }

//   return (
//     <BrowserRouter>
//       <div className="App">
//         <h1>QUIZ</h1>

//         {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
//           <button onClick={startQuiz}>Start</button>
//         ) : null}

//         {!gameOver ? <p>Score: {score}</p> : null}

//         {loading ? <p>Loading Question...</p> : null}

//         {!loading && !gameOver ? (
//           <QuestionCard
//             questionNr={number + 1}
//             totalQuestions={TOTAL_QUESTIONS}
//             question={questions[number].question}
//             answers={questions[number].answers}
//             userAnswer={userAnswers ? userAnswers[number] : undefined}
//             callback={checkAnswer}
//           />
//         ) : null}

//         {!loading &&
//         !gameOver &&
//         userAnswers.length === number + 1 &&
//         number !== TOTAL_QUESTIONS - 1 ? (
//           <button onClick={nextQuestion}>Next Question</button>
//         ) : null}
//       </div>

//       <Routes>
//         <Route path="/" element={<Player />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App
