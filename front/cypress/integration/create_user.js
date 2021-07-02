/// <reference types="cypress" />

describe("Create a user", () => {
  beforeEach(() => {
    cy.visit("/connection");
  });

  it("allows the user to signup for a new account", () => {
    cy.get('input[name="email"]').type("user@email.com");
    cy.get('input[name="username"]').type("user@email.com");
    cy.get('input[name="password"]').type("testPassword1234");
    cy.get("button")
      .contains("Create")
      .click();

    cy.url().should("include", "/");
  });

  it("User cant create an accout if it already exists ", () => {
    cy.get('input[name="email"]').type("user@email.com");
    cy.get('input[name="username"]').type("user@email.com");
    cy.get('input[name="password"]').type("testPassword1234");
    cy.get("button")
      .contains("Create")
      .click();
    cy.get(".form-error")
      .contains("An error occured while creating your account")
      .should("be.visible");
  });
});

describe("Sign in", () => {
  beforeEach(() => {
    cy.visit("/connection");
    cy.get('.link')
    .contains("Sign in here")
    .click();
  });

  it("allows the user to sign in", () => {
    cy.get('input[name="username"]').type("user@email.com");
    cy.get('input[name="password"]').type("testPassword1234");
    cy.get("button")
      .contains("Connection")
      .click();

    cy.url().should("include", "/");
  });

  it("User can't sign in with wrong inputs ", () => {
    cy.get('input[name="username"]').type("user@email.com");
    cy.get('input[name="password"]').type("hello123");
    cy.get("button")
      .contains("Connection")
      .click();
    cy.wait(500)
    cy.get("DIV.form-error")
      .contains("An error occured while trying to sign you up")
      .should("be.visible");
  });
});
