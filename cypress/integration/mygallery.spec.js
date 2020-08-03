import {EMAIL} from '../fixtures/constants'

describe('Route all', () => {

  beforeEach(() => {
    cy.server()
    cy.route('GET', Cypress.env('apiUrl') + '/my-galleries?page=1&term=').as('mojaGalerija')
  })

  it('Stubing', () => {
      cy.loginBackend(EMAIL.EXISTING, EMAIL.PASSWORD)

        cy.visit('/my-galleries')
        cy.wait('@mojaGalerija')
        cy.get('@mojaGalerija').its('response').then((resp)=>{

            //var elementi = document.getElementsByClassName('box-title').length;
            //cy.log(elementi);
            for(var i=0; i<10; i++){
            let useCaseID = resp.body.galleries[i].id
            cy.request({
                method: 'DELETE',
                url:`${Cypress.env('apiUrl')}/galleries/${useCaseID}`,
                form: true,
                followRedirect: true,
                headers: {
                    authorization: `Bearer ${window.localStorage.getItem('token')}`
                }
                })
            }

            })
        })
})