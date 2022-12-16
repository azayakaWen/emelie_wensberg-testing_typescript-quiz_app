import { shuffleArray } from "../utils"
import Config from "../QuizConfig"
import { Difficulty } from "../enums/QuizDifficulty"
import {Question} from "../interfaces/QuestionInterface"

export type QuestionState = Question & {answers: string[]}

export const fetchQuizQuestions =async (difficulty: Difficulty) => {
  const endpoint = `${Config.url}limit=${Config.totalQuestions}&difficulty=${difficulty}`
  const data = await (await fetch(endpoint)).json()
  console.log(data)
  return data.map((question: Question) => ({
    ...question,
    answers: shuffleArray([...question.incorrectAnswers, question.correctAnswer]
      )
  }))
}
