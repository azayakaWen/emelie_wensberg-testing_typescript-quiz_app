import React from "react"
import Config from "../QuizConfig"
import "./ComponentsStyle.css"

import { AnswerType } from "../Pages/Quiz"

type Props = {
  question: string
  answers: string[]
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void
  userAnswer: AnswerType | undefined
  questionNr: number
  totalQuestions: number
  quiestionCountDown: number
}

const totalQuestions = Config.totalQuestions

export const QuestionCard = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  quiestionCountDown,
}: Props) => {
  return (
    <div>
      <p className="amount-questions">
        {questionNr} / {totalQuestions}
      </p>

      <div className="question-container">
        <p>{question}</p>

        {answers.map((answer) => (
          <div className="answers" key={answer}>
            <button
              className="btn-answer"
              style={{
                backgroundColor:
                  userAnswer?.correctAnswer === answer ? "green" : "",
              }}
              value={answer}
              disabled={!!userAnswer || quiestionCountDown === 0}
              onClick={callback}
            >
              {answer}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
