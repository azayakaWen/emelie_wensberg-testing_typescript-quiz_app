import React from "react"
import Config from "../QuizConfig"

import { AnswerObject } from "../Pages/Quiz"

type Props = {
  question: string
  answers: string[]
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void
  userAnswer: AnswerObject | undefined
  questionNr: number
  totalQuestions: number
}

const totalQuestions = Config.totalQuestions

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
}) => {
  return (
    <div>
      <p>
        {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />

      <div>
        {answers.map((answer, index) => (
          <div key={index}>
            <button disabled={!!userAnswer} value={answer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuestionCard
