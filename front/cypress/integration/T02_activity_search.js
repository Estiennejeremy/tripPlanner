/// <reference types="cypress" />
const dayjs = require("dayjs");

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
    cy.get("input.mapboxgl-ctrl-geocoder--input").type("Par");
    cy.get(".suggestions").should("be.visible");
    cy.get("input.mapboxgl-ctrl-geocoder--input").type("{enter}");
  });

  it("Do a search", () => {
    cy.get("input.mapboxgl-ctrl-geocoder--input").type("Par");
    cy.wait(500);
    cy.get("input.mapboxgl-ctrl-geocoder--input").type("{enter}");
    cy.get("li")
      .contains("Bar")
      .click({ force: true });
    cy.get('input[name="date"]').type("2021-07-20");
    cy.get("button")
      .contains("Search")
      .click();

    cy.url().should(
      "include",
      "date=2021-07-20&type=bar"
    );
  });

  it("Perform a search with results on map", () => {
    cy.visit("/search/activity?placeId=15&date=2021-07-20&type=bar");
    cy.intercept(
      "https://trip-planner-10-api.herokuapp.com/api/activities*"
    ).as("getActivity");
    cy.wait(2000);
    // cy.get("canvas.mapboxgl-canvas").should("be.visible");
    // const nbResult = cy
    //   .get(".activities")
    //   .find(".card-content")
    //   .its("length");
    // nbResult.should("be.gt", 5);
    // cy.get(".mapboxgl-canvas-container")
    //   .find(`[aria-label="Map marker"]`)
    //   .its("length")
    //   .should("be.gt", 5);
  });
});
