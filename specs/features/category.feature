Feature: Category

  Scenario: Should select the correct category
    Given I selected category: History
    When Is selected correct
    Then The selected catecory is: History
