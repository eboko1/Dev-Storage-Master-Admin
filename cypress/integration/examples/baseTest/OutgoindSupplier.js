/// <reference types="cypress" />

const baseUrl = 'https://'+Cypress.env('url')+'my.carbook.pro';
describe ('Повернення Постачальнику SRT', function(){
        beforeEach('User LogIn ', () => {
            cy.visit(baseUrl)
            cy.get('#login.ant-input').type(Cypress.env('DevLogin'));  
            cy.get('#password').type(Cypress.env('Password'));
            cy.get('button').click()
            cy.intercept('GET', baseUrl+'/dashboard')
            cy.get('.styles-m__title---Nwr2X').contains('Календар Завантаження');
            cy.get('.styles-m__logo---2zDPJ').click()
            cy.contains('Швидка навігація').click({force: true})
            cy.get('h1').should('have.text','Швидка навігація')
        });

        it('Створення нового документу /Повернення Постачальнику', ()=>{
            cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(8) > .styles-m__folderLink---2Myrv').click({force: true})
            cy.get(':nth-child(1) > :nth-child(2) > .ant-select > .ant-select-selection').should('have.text','Повернення постачальнику')
            cy.get('.ant-select > .ant-select-selection').eq(3).type('Exist')
            cy.wait(2000);
            cy.get('.ant-select-dropdown-menu-item').first().click({force: true})
            cy.wait(2000);
            cy.get('.ant-input').eq(3).clear().type('Коментарій Повернення постачальнику').should('have.text','Коментарій Повернення постачальнику')
            cy.get(':nth-child(3) > .ant-input').type('3333')
            cy.get(':nth-child(3) > :nth-child(1) > .ant-select > .ant-select-selection').click()
            cy.wait(2000);
            cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
            cy.wait(2000);
            //Реквізити Постачальника 
            //cy.get(':nth-child(3) > :nth-child(2) > .ant-select > .ant-select-selection').click()
            //cy.wait(2000);
            //cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
            cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
            cy.get('.styles-m__title---Nwr2X > :nth-child(1) > span').should('have.text','Нов.')
        })

        it('Вибір Товару з модалки Каталог', () => {
            cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(8) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
            cy.get('.styles-m__header---2z2EP').find(':nth-child(1) > .ant-btn').should('have.text','Повернення постачальнику')
            cy.wait(2000)
            cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
            cy.get('.ant-table-row > :nth-child(1) > .ant-btn').first().click({force: true})
            cy.wait(2000);
            cy.get('.ant-input').eq(0).should('have.text','')
            cy.get('.ant-modal-body').find('.ant-btn').first().click({force: true})
            cy.get('[data-row-key="0"] > :nth-child(8) > .ant-btn').first().click({force: true})
            cy.get('.ant-modal-body').find('.ant-input').last().click()
            cy.get('.ant-modal-header').last().should('have.text','Вибір комірки')
            cy.get('[data-row-key="20.1.A.A"] > :nth-child(8) > .ant-btn').first().click({force: true})
            cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
            cy.wait(2000);
            cy.get('div.ant-dropdown-trigger > span').click()
            cy.wait(2000);
            cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
            cy.wait(2000);
            cy.get('.styles-m__header---2z2EP').contains('Врах.').should('exist')
            cy.get('.styles-m__header---2z2EP').find('.anticon-dollar').should('exist').first().click({force: true})
            cy.get('.ant-modal-header').should('have.text','Касовий ордерЗвичайнийСервісне внесенняСервісна видача')
            cy.wait(2000);
            cy.get('.styles-m__buttonGroup---14_lS').find('.ant-btn').click()
            cy.wait(2000);
            cy.get('.styles-m__sumNumeral---KAUvr').find('span').last().should('have.text','0 грн.')
            cy.get('.styles-m__header---2z2EP').find('.anticon-close').click()
            cy.get('.styles-m__header---2z2EP').contains('Врах.').should('exist')

        })

        it('Відображення документа в списку Витрат на Складі ', () => {
            cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(8) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
            cy.get('.styles-m__header---2z2EP').find(':nth-child(1) > .ant-btn').should('have.text','Повернення постачальнику')
            cy.wait(2000)
            cy.get('[data-row-key] > :nth-child(1) > a').first().invoke('text').then(text =>{
                cy.log(text)
                const numArr = text.split('-') 
                cy.get('.styles-m__paper---3d-H1').find('.ant-input').type(numArr[numArr.length-1])
                cy.get('.ant-table-row > :nth-child(1) > a').first().invoke('text').then( textFind =>{
                    expect(text).to.eq(textFind)
                })
            })
        })

        it('Завантаження документа', () => {
            cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(8) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
            cy.get('.styles-m__header---2z2EP').find(':nth-child(1) > .ant-btn').should('have.text','Повернення постачальнику')
            cy.wait(2000)
            cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
            cy.get('.styles-m__header---2z2EP').find('.anticon-printer ').click({force: true})
            cy.get('.ant-dropdown-menu > :nth-child(1)').click({force: true})  // document-SRT-594-1759
            cy.get('.styles-m__header---2z2EP').contains('Врах.').should('exist')
            cy.get('.ant-dropdown-menu > :nth-child(2)').click({force: true}) // Store document report for 1759
            cy.get('.styles-m__header---2z2EP').contains('Врах.').should('exist')
            cy.get('.styles-m__title---Nwr2X > :nth-child(1)').first().invoke('text')
                .then (text => {
                   var textArr = text.split(' ')
                   var numArr = textArr[textArr.length-1].split('-') 
                   const path = require("path");
                   cy.wait(1000);
                   cy.readFile(path.join('cypress/downloads', 'document-'+textArr[textArr.length-1]+'.pdf')).should("exist"); 
                   cy.readFile(path.join('cypress/downloads', 'Store document report for '+numArr[numArr.length-1]+'.xlsx')).should("exist"); 
            })
            cy.get('.ant-form').should('exist')
        })
    })