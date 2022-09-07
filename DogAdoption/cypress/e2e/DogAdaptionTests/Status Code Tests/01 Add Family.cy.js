/// <reference types ="Cypress" />

describe('Add Family', ()=>{
    
    it('Valid Family - Status 201', ()=>{
        cy.request({
            method: 'POST',
            url: 'https://join.reckon.com/family',
            body: {
                "name": "HighTower",
                "postCode": "1111"
            }
        }).then((res)=>{
            expect(res.status).to.equal(201)
            expect(res.body).has.property('id').is.not.null
            expect(res.body).has.property('name',"HighTower")
            expect(res.body).has.property('postCode', "1111")
        })
    })

    it('Invalid Object - Status 400', ()=>{
        cy.request({
            method: 'POST',
            url: 'https://join.reckon.com/family',
            body: {
                "postCode": null
            }
        }).then((res)=>{
            expect(res.status).to.equal(400)
        })
    })

    it('Existing Item - Status 409', ()=>{

        const familyName = "Perry"
        const postCode = "9999"

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
        })

        cy.request({
            method: 'POST',
            url: 'https://join.reckon.com/family',
            body: {
                "name": familyName,
                "postCode": postCode
            }
        }).then((res)=>{
            expect(res.status).to.equal(409)
        })
    })
})