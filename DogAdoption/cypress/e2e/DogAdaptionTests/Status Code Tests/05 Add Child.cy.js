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

    it('Add Valid Child - Status Code 201', ()=>{
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

    it('Add Invalid Child - Status Code 400', ()=>{
        cy.request({
            method: 'POST',
            url: 'https://join.reckon.com/child',
            body: {}
        }).then((res)=>{
            expect(res.status).to.equal(400)
        })
    })

    it('Add Invalid Child - Status Code 409', ()=>{
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
            expect(res.status).to.equal(409)
        })
    })
})