import {EMAIL} from '../fixtures/constants'
import {authPage} from '../page_object/login.page'
import {gallPage} from '../page_object/create-gallery.page'

const faker = require('faker');

var fakerTitle = faker.random.word();
var fakerDescription = faker.lorem.sentence();
var fakerImage = faker.image.avatar();

describe('Create gallery module', () => {

  beforeEach(() => {
    cy.visit('/login')
    authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
    cy.server()
    cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries')
    cy.wait('@galleries')
    cy.visit('/create')
    cy.url().should('eq','https://gallery-app.vivifyideas.com/create')
  })

  it('GA-21, GA-27, GA-34 : Create new gallery valid  ', () => {
    gallPage.createGallery('Create Gallery', fakerTitle, fakerDescription, fakerImage)
    cy.log('Gallery = 1')
    // cy.get('h1').contains('Create Gallery').should('be.visible')
    // cy.get('#title').type(fakerTitle)
    // cy.get('#description').type(fakerDescription)
    // cy.get('[type=url]').type(fakerImage)
    // cy.get('[type=submit]').contains('Submit').click()
  })

  it.only('My gallery - pagination - load more', () => {
      for(var i=2;i<=10;i++){
        cy.visit('/create')
        gallPage.createGallery('Create Gallery', 'Test', 'Test galerija', fakerImage);
        cy.log('Gallery = ' + i)
        }
        cy.visit('/my-galleries')
        cy.contains('Load More').should('not.exist')
        cy.visit('/create')
        gallPage.createGallery('Create Gallery', fakerTitle, fakerDescription, fakerImage);
        cy.log('Gallery = 11')
        cy.visit('/my-galleries')
        cy.get('.btn-custom').contains('Load More').should('be.visible')
  })

  it('My gallery - delete', () => {
    for(var j=1;j<=11;i++){
      cy.visit('/my-galleries')
      cy.get('.box-title').first().click()
      cy.wait(1000)
      cy.get('.btn-custom').contains('Delete Gallery').click()
    }


})

})

//cy.get('div.grid).children().should('have.length', 10)