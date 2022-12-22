import { loadFeature, defineFeature } from 'jest-cucumber'
import {Category} from '../../enums/enums'

const feature = loadFeature('./specs/features/category.feature')

export const getCategory = (category: string): Category => {
  let value = (<any>Category)[category] as Category
  if (value === undefined) new Error ('404 not found')
  return value
}

defineFeature(feature, (test) => {
  let selectedCategory : Category

  test('Should select the correct category', ({given, when, then}) => {

    given(/^I selected category: ([a-zA-Z]+)$/,(category) => {
      selectedCategory = getCategory(category)
    })

    when('Is selected correct',() => {
      if (selectedCategory !== Category.History)
        new Error('404 not found')
    })

    then(/^The selected catecory is: ([a-zA-Z]+)$/, (expected) => {
      expect(selectedCategory).toBe(expected)
    })
  })
})
