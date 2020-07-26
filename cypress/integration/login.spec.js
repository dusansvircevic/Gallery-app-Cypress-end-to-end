const faker = require('faker');

var fakerEmail = faker.internet.email();
var fakerpassword = faker.internet.password();

describe('Login module', () => {

  it('GA-19 : Login page layout ', () => {
    cy.visit('/')
    cy.get('.nav-link').contains('Login').click()
    cy.get('#email').should('be.visible')
    cy.get('form > :nth-child(2)').should('be.visible')
    cy.get('[type=submit]').should('be.visible')
  })

  it('GA-28 : Login - valid data, GA-32 : User is logged  ', () => {
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
    cy.get('#email').type(fakerEmail)
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
    cy.get('form > :nth-child(2)').type(fakerpassword)
    cy.get('[type=submit]').click()
    cy.get('.alert').should('be.visible')
                    .should('have.text', 'Bad Credentials')   
                    .should('have.class', 'alert') 
  })

  it('GA-26 : Login - invalid data - username and password ', () => {
    cy.visit('/')
    cy.get('.nav-link').contains('Login').click()
    cy.get('#email').type(fakerEmail)
    cy.get('form > :nth-child(2)').type(fakerpassword)
    cy.get('[type=submit]').click()
    cy.get('.alert').should('be.visible')
                    .should('have.text', 'Bad Credentials')   
                    .should('have.class', 'alert') 
  })

})