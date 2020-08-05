import {EMAIL} from '../fixtures/constants'
import {authPage} from '../page_object/login.page'
import {gallPage} from '../page_object/create-gallery.page'

const faker = require('faker');

var fakerTitle = faker.random.word();
var fakerDescription = faker.lorem.sentence();
var fakerImage = faker.image.avatar();

describe('Create edit delte gallery', () => {

    beforeEach(() => {
    cy.visit('/')
    cy.get('.nav-link').contains('Login').click()
    authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
    cy.server()
    cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries')   
    cy.wait('@galleries')
    cy.get('.nav-link').contains('Logout').should('be.visible')    
    })

  it('GA-21, GA-27, GA-34 : Create new gallery valid  ', () => {
      cy.visit('/create')
    gallPage.createGallery('Create Gallery', fakerTitle, fakerDescription, 'https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg')
  })

  it('Edit glalery - add image', () => {
    cy.visit('/my-galleries')
    cy.get('.box-title').eq(0).click()
    cy.get('.btn-custom').contains('Edit Gallery').click()
    cy.get('form > :nth-child(3) > :nth-child(3)').click()
    cy.get(':nth-child(3) > .input-group > .form-control').type(fakerImage)
    cy.get('[type=submit]').contains('Submit').click()
})

it('Edit glalery - switch positions of images', () => {
    cy.visit('/my-galleries')
    cy.get('.box-title').eq(0).click()
    cy.get('.btn-custom').contains('Edit Gallery').click()
    cy.get(':nth-child(2) > .input-group > .input-group-append > :nth-child(3)').click()
    
    cy.get('[type=submit]').contains('Submit').click()
})

  it('Delete image from gallery', () => {
      cy.visit('/my-galleries')
      cy.get('.box-title').eq(0).click()
      cy.get('.btn-custom').contains('Edit Gallery').click()
      cy.get('.input-buttons').eq(0).click()
      cy.get('[type=submit]').contains('Submit').click()
})

  it('Delete gallery', () => {
      cy.visit('/my-galleries')
      cy.get('.box-title').eq(0).click()
      cy.wait(1000)
      cy.get('.btn-custom').contains('Delete Gallery').click()
})

})

