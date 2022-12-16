import { shuffleArray } from "../utils"
import Config from "../QuizConfig"
import { Difficulty, Category } from "../enums/enums"
import {Question} from "../interfaces/QuestionInterface"

export type QuestionState = Question & {answers: string[]}

const randomDifficulties = (difficulty: string) => {
  const difficulties = ['easy', 'medium', 'hard']
  if (difficulty === 'random') {
    return difficulties[Math.floor(Math.random() * difficulties.length)]
  }
  return difficulty
}

export const fetchQuizQuestions =async (difficulty: Difficulty, category: Category) => {
  const endpoint = `${Config.url}${category}&limit=${Config.totalQuestions}&difficulty=${randomDifficulties(difficulty)}`
  const data = await (await fetch(endpoint)).json()
  console.log(data)
  return data.map((question: Question) => ({
    ...question,
    answers: shuffleArray([...question.incorrectAnswers, question.correctAnswer]
      )
  }))
}
