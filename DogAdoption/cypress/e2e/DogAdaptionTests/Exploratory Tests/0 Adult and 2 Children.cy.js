/// <reference types ="Cypress" />

describe('0 Adult and 2 Children', ()=>{
    
    let familyId = null;
    
    it('When a family is added', ()=>{
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

for (let index = 0; index < 2; index++) {

    it('And add child ' + (index + 1), ()=>{
        cy.fixture('family-pool').then((data) => {
            cy.request({
                method: 'POST',
                url: 'https://join.reckon.com/child',
                body: {
                    "familyId": familyId,
                    "firstName": data.children[index].name,
                    "lastName": data.familyName,
                    "favouriteToy": data.children[index].favouriteToy
                }
            }).then((res)=>{
                expect(res.status).to.equal(201)
                expect(res.body).has.property('id').is.not.null
                expect(res.body).has.property('familyId',familyId)
                expect(res.body).has.property('firstName', data.children[index].name)
                expect(res.body).has.property('lastName', data.familyName)
                expect(res.body).has.property('favouriteToy', data.children[index].favouriteToy)
            })
        })
    })
}

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