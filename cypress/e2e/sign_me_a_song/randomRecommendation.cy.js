/// <reference types="cypress" />

const url = 'http://localhost:3000';

before(() => {
    cy.seedDatabaseMany();
})

after(() => {
    cy.resetDatabase();
});

describe('random recommendation tab', () => {
    it('switch from home to random', () => {       
        cy.visit(url);

        cy.contains("Random").click();
        cy.url().should("equal", url + '/random');
    });


    it('get a recommendations', () => {       
        cy.visit(url + '/random');
        cy.intercept("GET", "/recommendations/random").as("getRandomRecommendation");
        cy.wait("@getRandomRecommendation");

        cy.get("#upvote").should("be.visible");
        cy.get("#song_name").should("be.visible");
    });
})