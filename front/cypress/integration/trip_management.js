/// <reference types="cypress" />

describe("Create a trip", () => {
  const tripName = "Paris trip";
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
    cy.wait(2000);
  });

  it("User should be able to create a trip", () => {
    cy.visit("/trips");
    cy.get("button")
      .contains("Add a trip")
      .click();
    cy.get(".con-vs-popup").should("be.visible");
    cy.get('input[name="tripName"]').type(tripName);
    cy.get("#fromLocation").within(() => {
      cy.get(".mapboxgl-ctrl-geocoder--input").type("Madrid");
      cy.wait(500);
      cy.get("input.mapboxgl-ctrl-geocoder--input").type("{enter}");
    });
    cy.get('input[name="fromDate"]').type("2021-07-22");
    cy.get("#toLocation").within(() => {
      cy.get(".mapboxgl-ctrl-geocoder--input").type("Paris");
      cy.wait(500);
      cy.get("input.mapboxgl-ctrl-geocoder--input").type("{enter}");
    });
    cy.get('input[name="toDate"]').type("2021-07-30");
    cy.get("button")
      .contains("Save")
      .click();
    cy.get(".vs-popup--header")
      .children("i.vs-popup--close")
      .click({ multiple: true, force: true });
    cy.get(".trip-card").should("be.visible");
    cy.get(".vs-card--header")
      .contains(tripName)
      .should("be.visible");
  });

  it("Should add an activity to a trip", () => {
    cy.visit("/");
    cy.get("input.mapboxgl-ctrl-geocoder--input").type("Par");
    cy.wait(500);
    cy.get("input.mapboxgl-ctrl-geocoder--input").type("{enter}");
    cy.get("li")
      .contains("Hotel")
      .click({ force: true });
    cy.get('input[name="date"]').type("2021-07-22");
    cy.get("button")
      .contains("Search")
      .click();
    cy.get("i.add-icon")
      .first()
      .click();
    cy.get(".add-to-trip").within(() => {
      cy.get('input.input-select.vs-select--input:visible').click({ force: true });
    })
    cy.get("button")
      .contains("Save")
      .click({force: true});
  });

  it("Should open a trip's page", () => {
    cy.visit("/trips");
    cy.wait(2000);
    cy.get("span.vs-button-text.vs-button--text")
    .contains("Open")
    .click();
    cy.url().should("include", "/trip?id=");
    // cy.get("button")
    // .contains("Print my trip")
    // .click({ force: true });
    // cy.window().then(win => {
    //   printStub = cy.stub(win, 'printElem')
    // })
    // cy.window().then(win => {
    //     expect(printStub).to.be.calledOnce
    //   })
  });

  it("Should delete a trip", () => {
    cy.visit("/trips");
    cy.wait(2000);
    cy.get("span.vs-button-text.vs-button--text")
      .contains("Delete")
      .click();
    cy.wait(2000);
    cy.get(".trip-card").should("not.exist");
    cy.get("h2")
      .contains(
        "Oops ! Seems like you don't have any trips yet... Try adding one !"
      )
      .should("be.visible");
  });
});
