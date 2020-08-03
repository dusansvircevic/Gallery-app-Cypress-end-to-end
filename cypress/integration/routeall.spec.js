import {EMAIL} from '../fixtures/constants'
//import {authPage} from '../page_object/login.page'
//import {randomEmail} from '../utils/'

//const faker = require('faker');

//var fakerEmail = faker.internet.email();
//var fakerpassword = faker.internet.password();

describe('Route all', () => {

  beforeEach(() => {
    cy.server()
    cy.route('GET', Cypress.env('apiUrl') + '/galleries?page=1&term=', 'fixture:all.json').as('stubing')
  })

  it('Stubing', () => {
      cy.loginBackend(EMAIL.EXISTING, EMAIL.PASSWORD)
    //   cy.request('POST', Cypress.env('apiUrl') + '/auth/login', 
    //   {"email":"dusan_master@hotmail.com","password":"Testcase1"})
    //   .then((resp)=>{
    //       expect(resp.body).to.have.property('access_token')
    //       expect(resp.body).to.have.property('token_type')
    //       localStorage.setItem('token', resp.body.access_token)
    //   })
        //cy.visit('/')
        cy.wait('@stubing')
        cy.get('@stubing').its('response').then((resp)=>{
            cy.request({
                method: 'DELETE',
                url:Cypress.env('apiUrl') + '/galleries/' + resp.body.galleries[0].id,
                form: true,
                followRedirect: true,
                headers: {
                    authorization: `Bearer ${window.localStorage.getItem('token')}`
                }
                })
            })
        })

})