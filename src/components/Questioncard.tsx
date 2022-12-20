import React from "react"
import Config from "../QuizConfig"

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
      <p>
        {questionNr} / {totalQuestions}
      </p>

      <p>{question}</p>

      <div>
        {answers.map((answer) => (
          <div key={answer}>
            <button
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
