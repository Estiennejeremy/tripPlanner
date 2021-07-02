/// <reference types="cypress" />
const dayjs = require('dayjs')

describe("Search an activity", () => {
  beforeEach(() => {
    cy.visit("/connection");
    cy.get(".link")
      .contains("Sign in here")
      .click();
    cy.get('input[name="username"]').type("user@email.com");
    cy.get('input[name="password"]').type("testPassword1234");
    cy.get("button")
      .contains("Connection")
      .click();
  });

  it("Suggests cities to the user", () => {
    cy.get('input.mapboxgl-ctrl-geocoder--input').type("Par");
    cy.get(".suggestions").should("be.visible");
    cy.get('input.mapboxgl-ctrl-geocoder--input').type('{enter}')
  });
  
  it("Do a search", () => {
    cy.get('input.mapboxgl-ctrl-geocoder--input').type("Paris, France");
    cy.get('li').contains('Restaurant').click({force: true});
    cy.get('li').contains('Bar').click({force: true});
    cy.get('input[name="date"]').type('2021-12-12');
    cy.get("button").contains("Search").click();

    cy.url().should("include", "/search/activity?placeId=79&date=2021-12-12&type=restaurant,bar");
  });

  
});
