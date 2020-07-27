export default class Authpage {
    get email(){
        return cy.get('#email')
    }

    get password(){
        return cy.get('#password')
    }

    get submit(){
        return cy.get('[type=submit]')
    }

    get alert(){
        return cy.get('.alert')
    }

    login(mejl,sifra){
        this.email.type(mejl)
        this.password.type(sifra)
        this.submit.click()
    }
}

export const authPage = new Authpage()