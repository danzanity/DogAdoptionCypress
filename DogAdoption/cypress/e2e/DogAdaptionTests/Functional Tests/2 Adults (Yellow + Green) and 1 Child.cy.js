/// <reference types ="Cypress" />

describe('2 Adults and 1 Child', ()=>{
    
    let familyId = null;
    
    it('When the user adds family', ()=>{
        cy.fixture('family-pool').then((data)=>{
            cy.request({
                method: 'POST',
                url: 'https://join.reckon.com/family',
                body: {
                    "name": data.familyName,
                    "postCode": data.postCode
                }
            }).then((res)=>{
                expect(res.status).to.equal(201)
                expect(res.body).has.property('id').is.not.null
                expect(res.body).has.property('name',data.familyName)
                expect(res.body).has.property('postCode', data.postCode)
                familyId = res.body.id
                cy.log(familyId)
            })
        })
    })

    it('And add parent 1', ()=>{
        cy.fixture('family-pool').then((data)=>{
            cy.request({
                method: 'POST',
                url: 'https://join.reckon.com/parent',
                body: {
                    "familyId": familyId,
                    "firstName": data.adults[0].name,
                    "lastName": data.familyName,
                    "favouriteColour": data.adults[0].favouriteColour
                }
            }).then((res)=>{
                expect(res.status).to.equal(201)
                expect(res.body).has.property('id').is.not.null
                expect(res.body).has.property('familyId',familyId)
                expect(res.body).has.property('firstName', data.adults[0].name)
                expect(res.body).has.property('lastName', data.familyName)
                expect(res.body).has.property('favouriteColour', data.adults[0].favouriteColour)
            })
        })
    })

    it('And add parent 2', ()=>{
        cy.fixture('family-pool').then((data)=>{
            cy.request({
                method: 'POST',
                url: 'https://join.reckon.com/parent',
                body: {
                    "familyId": familyId,
                    "firstName": data.adults[3].name,
                    "lastName": data.familyName,
                    "favouriteColour": data.adults[3].favouriteColour
                }
            }).then((res)=>{
                expect(res.status).to.equal(201)
                expect(res.body).has.property('id').is.not.null
                expect(res.body).has.property('familyId',familyId)
                expect(res.body).has.property('firstName', data.adults[3].name)
                expect(res.body).has.property('lastName', data.familyName)
                expect(res.body).has.property('favouriteColour', data.adults[3].favouriteColour)
            })
        })
    })

    it('And add child 1', ()=>{
        cy.fixture('family-pool').then((data) => {
            cy.request({
                method: 'POST',
                url: 'https://join.reckon.com/child',
                body: {
                    "familyId": familyId,
                    "firstName": data.children[0].name,
                    "lastName": data.familyName,
                    "favouriteToy": data.children[0].favouriteToy
                }
            }).then((res)=>{
                expect(res.status).to.equal(201)
                expect(res.body).has.property('id').is.not.null
                expect(res.body).has.property('familyId',familyId)
                expect(res.body).has.property('firstName', data.children[0].name)
                expect(res.body).has.property('lastName', data.familyName)
                expect(res.body).has.property('favouriteToy', data.children[0].favouriteToy)
            })
        })
    })

    it('Then the family should not be eligible to adopt a dog', ()=>{
        cy.request({
            method: 'GET',
            url: ['https://join.reckon.com/family/', familyId, '/eligibility'].join('')

        }).then((res)=>{
            expect(res.status).to.equal(200)
            expect(res.body).has.property('allowedDog', "N")
            expect(res.body).has.property('numberOfDogs', 0)
        })
    })
})