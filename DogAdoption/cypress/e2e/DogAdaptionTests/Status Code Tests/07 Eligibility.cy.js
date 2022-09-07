/// <reference types ="Cypress" />

describe('Eligible (Green)', ()=>{
    
    let familyId = null;
    const familyName = 'Mormont';
    const postCode = '1001';
    
    it('Setup Family', ()=>{
        cy.request({
            method: 'POST',
            url: 'https://join.reckon.com/family',
            body: {
                "name": familyName,
                "postCode": postCode
            }
        }).then((res)=>{
            expect(res.status).to.equal(201)
            expect(res.body).has.property('id').is.not.null
            expect(res.body).has.property('name',familyName)
            expect(res.body).has.property('postCode', postCode)
            familyId = res.body.id
            cy.log(familyId)
        })
    })

    let parentId = null
    const parentFirstName = "Lyanna"
    const favouriteColour = "Green"

    it('Setup Parent', ()=>{
        cy.request({
            method: 'POST',
            url: 'https://join.reckon.com/parent',
            body: {
                "familyId": familyId,
                "firstName": parentFirstName,
                "lastName": familyName,
                "favouriteColour": favouriteColour
            }
        }).then((res)=>{
            expect(res.status).to.equal(201)
            expect(res.body).has.property('id').is.not.null
            expect(res.body).has.property('familyId',familyId)
            expect(res.body).has.property('firstName', parentFirstName)
            expect(res.body).has.property('lastName', familyName)
            expect(res.body).has.property('favouriteColour', favouriteColour)
            parentId = res.body.id
            cy.log(parentId)
        })
    })

    const childFirstName = "Lyanna"
    const favouriteToy = "Axe"

    it('Setup Child', ()=>{
        cy.request({
            method: 'POST',
            url: 'https://join.reckon.com/child',
            body: {
                "familyId": familyId,
                "firstName": childFirstName,
                "lastName": familyName,
                "favouriteToy": favouriteToy
            }
        }).then((res)=>{
            expect(res.status).to.equal(201)
            expect(res.body).has.property('id').is.not.null
            expect(res.body).has.property('familyId',familyId)
            expect(res.body).has.property('firstName', childFirstName)
            expect(res.body).has.property('lastName', familyName)
            expect(res.body).has.property('favouriteToy', favouriteToy)
        })
    })

    it('Eligibility - Status Code 200', ()=>{
        cy.request({
            method: 'GET',
            url: ['https://join.reckon.com/family/', familyId, '/eligibility'].join('')

        }).then((res)=>{
            expect(res.status).to.equal(200)
            expect(res.body).has.property('allowedDog', "Y")
            expect(res.body).has.property('numberOfDogs', 1)
        })
    })

    it('Ineligibility - Status Code 400', ()=>{
        cy.request({
            method: 'GET',
            url: ['https://join.reckon.com/family/', 123, '/eligibility'].join('')

        }).then((res)=>{
            expect(res.status).to.equal(400)
        })
    })
})