/// <reference types="cypress" />

before(() => {
    cy.seedDatabase();
})

after(() => {
    cy.resetDatabase();
});

describe('upvoting and downvoting', () => {
    it('click on upvote arrow should add 1 upvote', () => {       
        cy.visit('http://localhost:3000');

        cy.intercept("GET", "/recommendations").as("getRecommendations");
        cy.intercept("POST", "/recommendations/1/upvote").as("postUpvote");

        cy.contains("0").should("be.visible");
        cy.get('#upvote').click();

        cy.wait("@postUpvote");
        cy.wait("@getRecommendations");

        cy.contains("1").should("be.visible");
    });


    it('click on downvote arrow should remove 1 upvote', () => {       
        cy.visit('http://localhost:3000');

        cy.intercept("GET", "/recommendations").as("getRecommendations");
        cy.intercept("POST", "/recommendations/1/downvote").as("postDownvote");

        cy.contains("1").should("be.visible");
        cy.get('#downvote').click();

        cy.wait("@postDownvote");
        cy.wait("@getRecommendations");

        cy.contains("0").should("be.visible");
    })
})