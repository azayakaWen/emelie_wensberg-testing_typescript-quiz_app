Feature: Answers

Scenario: Check right Answers
Given correct: correctAnswer and incorrect: incorrectAnswers
When Callen the functionen to check answer
Then the result should be correctAnswer
