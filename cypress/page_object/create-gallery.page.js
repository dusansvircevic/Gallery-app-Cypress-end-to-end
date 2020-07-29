export default class GallPage {

    get headline(){
        return cy.get('h1').contains('Create Gallery')
    }

    get title(){
        return cy.get('#title')
    }

    get description(){
        return cy.get('#description')
    }

    get image(){
        return cy.get('[type=url]')
    }

    get submit(){
        return cy.get('[type=submit]').contains('Submit')
    }

    createGallery(naslov, naziv, opis, slika){
        this.headline.should('be.visible')
        this.title.type(naziv)
        this.description.type(opis)
        this.image.type(slika)
        this.submit.click()
    }


}

export const gallPage = new GallPage()