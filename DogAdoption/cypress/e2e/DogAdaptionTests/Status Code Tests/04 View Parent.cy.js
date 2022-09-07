/// <reference types ="Cypress" />

describe('Add Parent', ()=>{

    let familyId = null;
    const familyName = 'Targaryen';
    const postCode = '7777';
    
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

    it('View Parent - Status Code 200', ()=>{
        cy.request({
            method: 'GET',
            url: 'https://join.reckon.com/parent/' + parentId
        }).then((res)=>{
            expect(res.status).to.equal(200)
            expect(res.body).has.property('id').is.not.null
            expect(res.body).has.property('familyId',familyId)
            expect(res.body).has.property('firstName', parentFirstName)
            expect(res.body).has.property('lastName', familyName)
            expect(res.body).has.property('favouriteColour', favouriteColour)
        })
    })

    it('View Invalid Parent - Status Code 400', ()=>{
        cy.request({
            method: 'GET',
            url: 'https://join.reckon.com/parent/' + null
        }).then((res)=>{
            expect(res.status).to.equal(400)
        })
    })

})