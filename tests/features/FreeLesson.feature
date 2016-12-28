Feature: Free Lessons
  EmberGrep should offer some lessons as free without requiring users to purchase or login.
  These lessons are specified by a "free" boolean in the lessons table

  Scenario: Get a list of free lessons
    Given A Fresh App
    And Seed the "lessons" table with data
      | title | description | position | free |
      | Foo   | Yo          | 1        | true |
    When I setup a JSON API Request
    And "GET" to "/api/free-lessons"
    And send request
    Then I get a JSON API Collection Result
    And the "1st" item has an attribute "title" with the value "Foo"
    And the "1st" item has an attribute "description" with the value "Yo"
    And the "1st" item has an attribute "position" with the value 1
