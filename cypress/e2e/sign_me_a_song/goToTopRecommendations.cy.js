/// <reference types="cypress" />

const url = 'http://localhost:3000';

before(() => {
    cy.seedDatabaseMany();
})

after(() => {
    cy.resetDatabase();
});

describe('top recommendations tab', () => {
    it('switch from home to top', () => {       
        cy.visit(url);

        cy.contains("Top").click();
        cy.url().should("equal", url + '/top');
    });


    it('biggest score recommendations should come first', () => {       
        cy.visit(url + '/top');
        cy.intercept("GET", "/recommendations/top/10").as("getRopRecommendations");
        cy.wait("@getRopRecommendations");

        cy.contains("248").should("be.visible");
        cy.contains("168").should("be.visible");
    });
})