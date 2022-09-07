/// <reference types ="Cypress" />

describe('View Family', ()=>{
    
    let familyId = null;
    const familyName = 'Stark';
    const postCode = '1003';

    it('Data Setup - Add Family', ()=>{
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

    it('Get Valid Family - Status 200', ()=>{
        cy.request({
            method: 'GET',
            url: 'https://join.reckon.com/family/' + familyId,
        }).then((res)=>{

            expect(res.status).to.equal(200)
            expect(res.body).has.property('id').is.not.null
            expect(res.body).has.property('name',familyName)
            expect(res.body).has.property('postCode', postCode)
        })
    })

    it('Bad Input Parameter - Status 400', () =>{
        cy.request({
            method: 'GET',
            url: 'https://join.reckon.com/family/' + '~!@#$%',
            failOnStatusCode : false
        }).then((res)=>{
            expect(res.status).to.equal(400)
        })
    })
})