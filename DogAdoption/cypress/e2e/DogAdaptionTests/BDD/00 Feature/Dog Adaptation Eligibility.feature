Feature: Dog Adaption Eligibility

Scenario: 0 Adult and 0 Child
  When the user adds family
  Then the family should not be eligible to adopt a dog

Scenario: 0 Adult and 1 Child
  When the user adds family
  And add child 1
  Then the family should not be eligible to adopt a dog