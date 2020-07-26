const faker = require('faker');

var fakerFirstName = faker.name.firstName();
var fakerLastName = faker.name.lastName();
var fakerEmail = faker.internet.email();
var fakerpassword = faker.internet.password();

describe('Register module', () => {
    it('GA-9 : Register page test', () => {
        cy.visit('/')
        cy.get('.nav-link').contains('Register').click()
        cy.get('#first-name').should('be.visible').click()
        cy.get('#last-name').should('be.visible').click()
        cy.get('#email').should('be.visible').click()
        cy.get('#password').should('be.visible').click()
        cy.get('#password-confirmation').should('be.visible').click()
        cy.get('[type=checkbox]').should('be.visible').click()
        cy.get('[type=submit]').should('be.visible').click()
    })

    it('GA-40 : Register page test - First name input field: required', () => {
        cy.visit('/register')
        cy.get('#last-name').type(fakerLastName)
        cy.get('#email').type(fakerEmail)
        cy.get('#password').type(fakerpassword)
        cy.get('#password-confirmation').type(fakerpassword)
        cy.get('[type=checkbox]').click()
        cy.get('[type=submit]').click()
    })

    it('GA-46 : Register page test - Last name input field: required', () => {
        cy.visit('/register')
        cy.get('#first-name').type(fakerFirstName)
        cy.get('#email').type(fakerEmail)
        cy.get('#password').type(fakerpassword)
        cy.get('#password-confirmation').type(fakerpassword)
        cy.get('[type=checkbox]').click()
        cy.get('[type=submit]').click()
    })

    it('GA-54 : Register page test - Email field required', () => {
        cy.visit('/register')
        cy.get('#first-name').type(fakerFirstName)
        cy.get('#last-name').type(fakerLastName)
        cy.get('#password').type(fakerpassword)
        cy.get('#password-confirmation').type(fakerpassword)
        cy.get('[type=checkbox]').click()
        cy.get('[type=submit]').click()
    })

    it('GA-55 : Register page test - Email field format invalid', () => {
        cy.visit('/register')
        cy.get('#first-name').type(fakerFirstName)
        cy.get('#last-name').type(fakerLastName)
        cy.get('#email').type('invalid email')
        cy.get('#password').type(fakerpassword)
        cy.get('#password-confirmation').type(fakerpassword)
        cy.get('[type=checkbox]').click()
        cy.get('[type=submit]').click()
    })

    it('GA-59 : Register page test - Password input field empty', () => {
        cy.visit('/register')
        cy.get('#first-name').type(fakerFirstName)
        cy.get('#last-name').type(fakerLastName)
        cy.get('#email').type(fakerEmail)
        cy.get('#password-confirmation').type(fakerpassword)
        cy.get('[type=checkbox]').click()
        cy.get('[type=submit]').click()
    })

    it('GA-60 : Register page test - Password Confirm input field empty', () => {
        cy.visit('/register')
        cy.get('#first-name').type(fakerFirstName)
        cy.get('#last-name').type(fakerLastName)
        cy.get('#email').type(fakerEmail)
        cy.get('#password').type(fakerpassword)
        cy.get('[type=checkbox]').click()
        cy.get('[type=submit]').click()
    })

    it('GA-81 : Confirmation password doesnt match', () => {
        cy.visit('/register')
        cy.get('#first-name').type(fakerFirstName)
        cy.get('#last-name').type(fakerLastName)
        cy.get('#email').type(fakerEmail)
        cy.get('#password').type(fakerpassword)
        cy.get('#password-confirmation').type(fakerEmail)
        cy.get('[type=checkbox]').click()
        cy.get('[type=submit]').click()
    })

    it('GA-82 : Password form - invalid', () => {
        cy.visit('/register')
        cy.get('#first-name').type(fakerFirstName)
        cy.get('#last-name').type(fakerLastName)
        cy.get('#email').type(fakerEmail)
        cy.get('#password').type('abcdefgh')
        cy.get('#password-confirmation').type('abcdefgh')
        cy.get('[type=checkbox]').click()
        cy.get('[type=submit]').click()
    })

    it('GA-83 : Password form - password has less then 8 characters', () => {
        cy.visit('/register')
        cy.get('#first-name').type(fakerFirstName)
        cy.get('#last-name').type(fakerLastName)
        cy.get('#email').type(fakerEmail)
        cy.get('#password').type('a1')
        cy.get('#password-confirmation').type('a1')
        cy.get('[type=checkbox]').click()
        cy.get('[type=submit]').click()
    })

    it('GA-84 : User can not register twice', () => {
        cy.visit('/register')
        cy.get('#first-name').type('test')
        cy.get('#last-name').type('test')
        cy.get('#email').type('ruzictam@gmail.com')
        cy.get('#password').type('testtest2')
        cy.get('#password-confirmation').type('testtest2')
        cy.get('[type=checkbox]').click()
        cy.get('[type=submit]').click()
        cy.get('.alert').should('be.visible')
                        .should('have.text', 'The email has already been taken.')   
                        .should('have.class', 'alert') 
    })

    it('GA-14 : Register page positive test - valid data', () => {
        cy.visit('/register')
        cy.get('#first-name').type(fakerFirstName)
        cy.get('#last-name').type(fakerLastName)
        cy.get('#email').type(fakerEmail)
        cy.get('#password').type(fakerpassword)
        cy.get('#password-confirmation').type(fakerpassword)
        cy.get('[type=checkbox]').click()
        cy.get('[type=submit]').click()
        cy.wait(3000)
        cy.get('a').contains('Logout').should('be.visible')
    })

})