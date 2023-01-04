//Random answers
export const shuffleArray = (array: any[]) =>
[...array].sort(() => Math.random() - 0.5)

//Different difficultys to select
export const difficultySelections = [
  { id: 'EASY', name: 'easy' },
  { id: 'MEDIUM', name: 'medium' },
  { id: 'HARD', name: 'hard' },
  { id: 'RANDOM', name: 'random' }
]

//Different categorys to select
export const categorySelections = [
  { id: 'arts_and_literature', name: 'Arts & Literature' },
  { id: 'film_and_tv', name: 'Film & TV' },
  { id: 'food_and_drink', name: 'Food & Drink' },
  { id: 'general_knowledge', name: 'General Knowledge' },
  { id: 'geography', name: 'Geography' },
  { id: 'history', name: 'History' },
  { id: 'music', name: 'Music' },
  { id: 'science', name: 'Science' },
  { id: 'society_and_culture', name: 'Society & Culture' },
  { id: 'sport_and_leisure', name: 'Sport & Leisure' }
]

//Point system for selected difficulty
export const POINTS_DIFFICULIY: any = {
  easy: 1,
  medium: 3,
  hard: 5,
  incorrect: 0
}

//Function to calculate the score
export function ScoreCalc(seconds: number, difficultyPoint: number,
  guessedAnswers: string | number | any,
  combo: number
  ): number {
  let bonus = combo > 2 ? combo : 0
  let result = seconds * difficultyPoint
  + guessedAnswers * bonus;
  return result;
}

export const TOTAL_QUESTIONS: number = 9
export const URL = "https://the-trivia-api.com/api/questions?"
export const COUNTDOWN: number = 30

const Config = {
  totalQuestions: TOTAL_QUESTIONS,
  url: URL,
  countdown: COUNTDOWN
}

export default Config
