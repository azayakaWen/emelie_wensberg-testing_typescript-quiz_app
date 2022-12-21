Feature: Difficulty

  Scenario: Select difficulty
    Given Selected difficulty: Easy
    When Is selected correct
    Then Selected difficulty is: Easy
