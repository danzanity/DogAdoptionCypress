/// <reference types ="Cypress" />

describe('0 Adult and 0 Child', ()=>{
    
    let familyId = null;
    
    it('When the user adds family only', ()=>{
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