/// <reference types="cypress" />

import {faker} from "@faker-js/faker";

after(() => {
    cy.resetDatabase();
});

describe('creating new recommendation', () => {
    it('fill inputs, submit, and see the recommendation', () => {
        const recommendation = {
            name: faker.music.songName(),
            link: `https://www.youtube.com/watch?v=fZ_gFyB6GnA`
        }

        cy.intercept("POST", "/recommendations").as("postRecommendation");
        cy.intercept("GET", "/recommendations").as("getRecommendations");
        
        cy.visit('http://localhost:3000');
        cy.get('#name').type(recommendation.name);
        cy.get('#link').type(recommendation.link);
        cy.get('#submit').click();

        cy.wait("@postRecommendation");
        cy.wait("@getRecommendations");
        cy.contains(recommendation.name).should("be.visible");
    })
})