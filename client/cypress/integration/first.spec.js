/// <reference types="cypress" />

describe("test", () => {
    it("visir page", () => {
        cy.visit("https://diplom-work-admin.herokuapp.com/");
        /* ==== Generated with Cypress Studio ==== */
        cy.get("#basic_login").clear();
        cy.get("#basic_login").type("admin");
        cy.get("#basic_password").clear();
        cy.get("#basic_password").type("le,ybwmrbq");
        cy.get(".ant-btn-primary > span").click();
        /* ==== End Cypress Studio ==== */
    });
});
