import { loadFeature, defineFeature } from 'jest-cucumber'
import { Difficulty } from '../../enums/enums'

const feature = loadFeature('./specs/features/difficulty.feature')

export const getDifficulty = (difficulty: string): Difficulty => {
  let value = (<any>Difficulty)[difficulty] as Difficulty
  if (value === undefined) new Error('404 not found')
  return value
}

defineFeature(feature, (test) => {
  let selectedDifficulty: Difficulty

  test('Select difficulty', ({ given, when, then }) => {
    given(/^Selected difficulty: ([a-zA-Z]+)$/, (difficulty) => {
      selectedDifficulty = getDifficulty(difficulty)
    })

    when('Is selected correct', () => {
      if (selectedDifficulty !== Difficulty.Easy)
        new Error('404 not found')
    })

    then(/^Selected difficulty is: ([a-zA-Z]+)$/, (expected) => {
      expect(selectedDifficulty).toBe(expected)
    })
  })
})
