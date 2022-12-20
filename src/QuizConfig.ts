export const difficultySelections = [
  { id: 'EASY', name: 'easy' },
  { id: 'MEDIUM', name: 'medium' },
  { id: 'HARD', name: 'hard' },
  { id: 'RANDOM', name: 'random' }
]

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


export const TOTAL_QUESTIONS: number = 9
export const URL = "https://the-trivia-api.com/api/questions?"
export const COUNTDOWN: number = 30

const Config = {
  totalQuestions: TOTAL_QUESTIONS,
  url: URL,
  countdown: COUNTDOWN
}

export default Config
