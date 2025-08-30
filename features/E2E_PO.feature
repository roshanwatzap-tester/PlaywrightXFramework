Feature: Cucumber: PXF-E2E Order Placement with DB Data @Web

  Scenario Outline: Place Order with DB Data
    Given On website "<URL>"
    When I login with DB credentials from DB
    And I search and add product "<testProduct>" to cart
    And I checkout with country "<testCountry>"
    Then The order should be logged in DB

  Examples:
    | URL                                   | testProduct    |testCountry|
    | https://rahulshettyacademy.com/client | ZARA COAT 3    |   India   |
