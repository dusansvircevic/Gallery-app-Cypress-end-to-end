const = faker = require(faker);

let firstName = faker.internet.email;
let lastName = faker.internet.password;

describe('Login module', () => {

  it.only('GA-19 : Login page layout ', () => {
    cy.visit('/')
    cy.get('.nav-link').contains('Login').click()
    cy.get('#email').should('be.visible')
    cy.get('form > :nth-child(2)').should('be.visible')
    cy.get('[type=submit]').should('be.visible')
  })

  it('GA-28 : Login - valid data ', () => {
    cy.visit('/')
    cy.get('.nav-link').contains('Login').click()
    cy.get('#email').type('dusan_master@hotmail.com')
    cy.get('form > :nth-child(2)').type('Testcase1')
    cy.get('[type=submit]').click()
    cy.wait(1000)
    cy.get('.nav-link').contains('Logout').should('be.visible')    
  })

  it('GA-22 : Login - invalid data - username ', () => {
    cy.visit('/')
    cy.get('.nav-link').contains('Login').click()
    cy.get('#email').type('4444dusan_master@hotmail.com')
    cy.get('form > :nth-child(2)').type('Testcase1')
    cy.get('[type=submit]').click()
    cy.get('.alert').should('be.visible')
                    .should('have.text', 'Bad Credentials')   
                    .should('have.class', 'alert') 
  })

  it('GA-25 : Login - invalid data - password ', () => {
    cy.visit('/')
    cy.get('.nav-link').contains('Login').click()
    cy.get('#email').type('dusan_master@hotmail.com')
    cy.get('form > :nth-child(2)').type('444Testcase1')
    cy.get('[type=submit]').click()
    cy.get('.alert').should('be.visible')
                    .should('have.text', 'Bad Credentials')   
                    .should('have.class', 'alert') 
  })
})