/// <reference types="cypress" />

const baseUrl = 'https://'+Cypress.env('url')+'my.carbook.pro';
const textServise = 'Доставка Запчастин'
var date = new Date();
const idProduct ='TEST'+date.getDate()+date.getMonth()+date.getMinutes();
//const idProduct ='TEST'+'11043'

describe ('Складські документи '+Cypress.env('url'), function(){
        beforeEach('User LogIn ', () => {
            cy.visit(baseUrl)
            cy.get('#login.ant-input').type(Cypress.env('Login'));  
            cy.get('#password').type(Cypress.env('Password'));
            cy.get('button').click()
            cy.intercept('GET', baseUrl+'/dashboard')
            cy.get('.styles-m__title---Nwr2X').contains('Календар Завантаження');
        });

        it('Створення нового Товару/Product id='+idProduct , ()=>{
            cy.get('.ant-menu-submenu-title').contains('Довідник').click()
            cy.wait(2000);
            cy.get('.ant-menu-submenu').contains('Товари').click()
            cy.get('.ant-btn').contains('Додати').click({force: true})
            cy.get('#code').type(idProduct)
            cy.get(':nth-child(3) > .ant-col-15 > .ant-form-item-control > .ant-form-item-children > .ant-select > .ant-select-selection').type('100 Plus')
            cy.wait(2000);
            cy.get('.ant-select-dropdown-menu-item').click({force: true})
            cy.wait(2000);
            cy.get(':nth-child(4) > .ant-col-15 > .ant-form-item-control > .ant-form-item-children > .ant-select > .ant-select-selection').type('1020201')
            cy.wait(2000);
            cy.get(':nth-child(3) > :nth-child(1) > :nth-child(3) > .ant-select-tree-treenode-switcher-open > .ant-select-tree-child-tree > li > .ant-select-tree-node-content-wrapper').click({force: true})
            cy.get('#tradeCode').type('0000000000')
            cy.get('#certificate').type('00000000000000000')
            cy.get('.ant-form').find('button').click()   //.contains('Застосувати')
            cy.wait(2000);
            cy.get(':nth-child(1) > :nth-child(1) > div > .ant-input').first().type(idProduct)
            cy.wait(3000);
            cy.get('.ant-table-content td').first().should('exist')
            cy.wait(3000);
            cy.get('a > div').first().invoke('text')
              .then (text => {
                  cy.log(text)
                expect(text).to.eq(idProduct)
           })
        })
        /////**************************************************************************************************************************** */

  it('Замовлення Постачальнику (ORD) / Створення нового документу ', ()=>{
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(1) > .styles-m__folderLink---2Myrv').click({force: true})

        cy.get(':nth-child(1) > :nth-child(2) > .ant-select > .ant-select-selection').should('have.text','Замовлення постачальнику')
        cy.get('.ant-select > .ant-select-selection').eq(3).type('Exist')
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(3).clear().type('Коментарій Замовлення постачальнику').should('have.text','Коментарій Замовлення постачальнику')
        cy.get(':nth-child(3) > .ant-input').type('ORD'+idProduct)

        cy.get(':nth-child(3) > :nth-child(1) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.wait(2000);
        cy.get(':nth-child(3) > :nth-child(2) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
        cy.get('.styles-m__title---Nwr2X > :nth-child(1) > span').should('have.text','Нов.')
    })

    it('Вибір створеного Товару з модалки Каталог', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        ////new
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(1) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
      ///new
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.get('.ant-table-row > :nth-child(1) > .ant-btn').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(0).should('have.text','')
        /// new
        cy.get('.ant-modal-body').find('.ant-input').first().type(idProduct) 
        ///
        cy.get('.ant-modal-body').find('.ant-input-number').first().type('111.11') 
        cy.get('.ant-modal-body').find('.ant-input-number-input').eq(1).clear().type('10.88')
        cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
        cy.wait(2000);
        cy.get('div.ant-dropdown-trigger > span').click()
        cy.wait(2000);
        cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
        cy.wait(2000);
        cy.get('.styles-m__header---2z2EP').contains('Врах.').should('exist')
        cy.get('.styles-m__header---2z2EP').find('.anticon-close').click()
    })

    it('Відображення трансфера в списку Замовлення постачальнику', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(1) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
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

     /////*************КОРИГУВАННЯ ЗАМОВЛЕННЯ*************************************************************************************************** */
     it('Коригування Замовлення (BOR) / Створення нового документу ', ()=>{
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(3) > .styles-m__folderLink---2Myrv').click({force: true})
        cy.get(':nth-child(1) > :nth-child(2) > .ant-select > .ant-select-selection').should('have.text','Коригування замовлення')
        cy.get('.ant-select > .ant-select-selection').eq(3).type('Exist')
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(3).clear().type('Коментарій Коригування Замовлення').should('have.text','Коментарій Коригування Замовлення')
        cy.get(':nth-child(3) > .ant-input').type('BOR'+idProduct)
        cy.get(':nth-child(3) > :nth-child(1) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.wait(2000);
        cy.get(':nth-child(3) > :nth-child(2) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
        cy.get('.styles-m__title---Nwr2X > :nth-child(1) > span').should('have.text','Нов.')
    })     
        
    it('Вибір корегуючого Товару з модалки Каталог', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        ////new
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(3) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
      ///new
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.get('.ant-table-row > :nth-child(1) > .ant-btn').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(0).should('have.text','')
        /// new
        cy.get('.ant-modal-body').find('.ant-input').first().type(idProduct) 
        ///
        cy.get('.ant-modal-body').find('.ant-input-number').first().type('111.11') 
        cy.get('.ant-modal-body').find('.ant-input-number-handler-up').eq(1).dblclick()
        cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
        cy.wait(2000);
        cy.get('div.ant-dropdown-trigger > span').click()
        cy.wait(2000);
        cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
        cy.wait(2000);
        cy.get('.styles-m__header---2z2EP').contains('Врах.').should('exist')
        cy.get('.styles-m__header---2z2EP').find('.anticon-close').click()
    })
    it('Відображення трансфера в списку коригування замовлення BOR', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(3) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
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
     /////***********ПРИХІД за ЗАМОВЛЕННЯМ***************************************************************************************************** */


    it('Прихід за Замовленням (COM) / Створення нового документу ', ()=>{
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(2) > .styles-m__folderLink---2Myrv').click({force: true})
        cy.get(':nth-child(1) > :nth-child(2) > .ant-select > .ant-select-selection').should('have.text','Прихід за замовленням')
        cy.get('.ant-select > .ant-select-selection').eq(3).type('Exist')
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(3).clear().type('Коментарій Прихід за замовленням').should('have.text','Коментарій Прихід за замовленням')
        cy.get(':nth-child(3) > .ant-input').type('COM'+idProduct)
        cy.get(':nth-child(3) > :nth-child(1) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.wait(2000);
        cy.get(':nth-child(3) > :nth-child(2) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
        cy.get('.styles-m__title---Nwr2X > :nth-child(1) > span').should('have.text','Нов.')
    })     
        
    it('Вибір створеного Товару з модалки Каталог', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        //new
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(2) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
      /new
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.get('.ant-table-row > :nth-child(1) > .ant-btn').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(0).should('have.text','')
        / new
        cy.get('.ant-modal-body').find('.ant-input').first().type(idProduct) 
        /
        cy.get('.ant-modal-body').find('.ant-input-number').first().type('111.11') 
        cy.get('.ant-modal-body').find('.ant-input-number-handler-up').eq(1).dblclick()
        cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
        cy.wait(2000);
        cy.get('div.ant-dropdown-trigger > span').click()
        cy.wait(2000);
        cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
        cy.wait(2000);
        cy.get('.styles-m__header---2z2EP').contains('Врах.').should('exist')
        cy.get('.styles-m__header---2z2EP').find('.anticon-close').click()
    })

    it('Відображення трансфера в списку Прихід за замовленням', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(2) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
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
    /////***********ПРИХІД за ЗАМОВЛЕННЯМ***************************************************************************************************** */
    /////***********ПРИХІД ТОВАРУ***************************************************************************************************** */
   
    it('Прихід Товару від Постачальника (INC) / Створення нового документу / ', ()=>{
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(6) > .styles-m__folderLink---2Myrv').click({force: true})
        cy.get(':nth-child(1) > :nth-child(2) > .ant-select > .ant-select-selection').should('have.text','Прихід від постачальника')
        cy.get('.ant-select > .ant-select-selection').eq(3).type('Exist')
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(3).clear().type('Коментарій Прихід від постачальника').should('have.text','Коментарій Прихід від постачальника')
        cy.get(':nth-child(3) > .ant-input').type('INC'+idProduct)
        cy.get(':nth-child(3) > :nth-child(1) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.wait(2000);
        cy.get(':nth-child(3) > :nth-child(2) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
        cy.get('.styles-m__title---Nwr2X > :nth-child(1) > span').should('have.text','Нов.')
    })

    it('Вибір Товару з модалки Каталог', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(6) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.get('.ant-table-row > :nth-child(1) > .ant-btn').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(0).should('have.text','')
        cy.get('.ant-modal-body').find('.ant-input').first().type(idProduct) 
        cy.get('.ant-modal-body').find('.ant-input-number-input').eq(1).clear().type('10.9') 
        cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
        cy.wait(2000);
        cy.get('div.ant-dropdown-trigger > span').click()
        cy.wait(2000);
        cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
        cy.wait(2000);
        cy.get('.styles-m__header---2z2EP').contains('Врах.').should('exist')
        cy.get('.styles-m__header---2z2EP').find('.anticon-dollar').should('exist').first().click({force: true})
        cy.get('.ant-modal-header').should('have.text','Касовий ордерЗвичайнийСервісне внесенняСервісна видача')
        cy.get('.styles-m__buttonGroup---14_lS').find('.ant-btn').click()
        cy.get('.styles-m__sumNumeral---KAUvr').find('span').should('have.text','0 грн.')
        cy.get('.styles-m__header---2z2EP').find('.anticon-close').click()
    })

    it('Відображення документа в списку Приходів на Склад ', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(6) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
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
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(6) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.get('.styles-m__header---2z2EP').find('.anticon-printer ').click({force: true})
        cy.get('.ant-dropdown-menu > :nth-child(1)').click({force: true})  // document-INC-594-1759
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

    it('Прихід Послуги (SRV) / Створення трансфера Послуги', ()=>{
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get('.styles-m__paper---3d-H1').children().eq(1).find(':nth-child(7) > .styles-m__folderLink---2Myrv').click({force: true})
        cy.get(':nth-child(1) > :nth-child(2) > .ant-select > .ant-select-selection').should('have.text','Послуги')
        cy.get('.ant-select > .ant-select-selection').eq(3).type('Exist')
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(3).clear().type('Коментарій Прихід Послуги').should('have.text','Коментарій Прихід Послуги')
        cy.get(':nth-child(3) > .ant-input').type('SRV'+idProduct)
        cy.get(':nth-child(3) > :nth-child(1) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.wait(2000);
        cy.get(':nth-child(3) > :nth-child(2) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
        cy.get('.styles-m__title---Nwr2X > :nth-child(1) > span').should('have.text','Нов.')
    })

    it('Вибір Послуги', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get('.styles-m__paper---3d-H1').children().eq(1).find(':nth-child(7) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('.styles-m__header---2z2EP').find(':nth-child(1) > .ant-btn').should('have.text','Послуги')
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.get('.ant-table-row > :nth-child(1) > .ant-btn').first().click({force: true})
        cy.get('.ant-modal-body').find('.ant-input').eq(0).should('have.text','').type(textServise)
        ///// cy.get('.ant-modal-body').find('.ant-input').eq(1).click()                                  // джерело
        cy.get(':nth-child(4) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').should('have.value','1,00')
        cy.get(':nth-child(5) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').should('have.value','1,00')
        cy.get(':nth-child(4) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type(222.22).should('have.value','222,22')
        cy.get(':nth-child(5) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type(2.2).should('have.value','2,2')
        cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
        cy.wait(2000);
        cy.get('div.ant-dropdown-trigger > span').click()
        cy.wait(2000);
        cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
        cy.wait(2000);
        cy.get('.styles-m__header---2z2EP').contains('Врах.').should('exist')
        cy.get('.styles-m__header---2z2EP').find('.anticon-dollar').should('exist').first().click({force: true})
        cy.get('.ant-modal-header').should('have.text','Касовий ордерЗвичайнийСервісне внесенняСервісна видача')
        cy.get('.styles-m__buttonGroup---14_lS').find('.ant-btn').click()
        cy.get('.styles-m__sumNumeral---KAUvr').find('span').should('have.text','0 грн.')
        cy.get('.styles-m__header---2z2EP').find('.anticon-close').click()
    })

    it('Відображення документа в списку Послуги', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get('.styles-m__paper---3d-H1').children().eq(1).find(':nth-child(7) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('.styles-m__header---2z2EP').find(':nth-child(1) > .ant-btn').should('have.text','Послуги')
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
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get('.styles-m__paper---3d-H1').children().eq(1).find(':nth-child(7) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('.styles-m__header---2z2EP').find(':nth-child(1) > .ant-btn').should('have.text','Послуги')
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.get('.styles-m__header---2z2EP').find('.anticon-printer ').click({force: true})
        cy.get('.ant-dropdown-menu > :nth-child(1)').click({force: true})  // document-SRV-594-1759
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

    it('Повернення Постачальнику (STR) / Створення трансфера', ()=>{
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(8) > .styles-m__folderLink---2Myrv').click({force: true})
        cy.get(':nth-child(1) > :nth-child(2) > .ant-select > .ant-select-selection').should('have.text','Повернення постачальнику')
        cy.get('.ant-select > .ant-select-selection').eq(3).type('Exist')
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(3).clear().type('Коментарій Повернення постачальнику').should('have.text','Коментарій Повернення постачальнику')
        cy.get(':nth-child(3) > .ant-input').type('STR'+idProduct)
        cy.get(':nth-child(3) > :nth-child(1) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.wait(2000);
        cy.get(':nth-child(3) > :nth-child(2) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
        cy.get('.styles-m__title---Nwr2X > :nth-child(1) > span').should('have.text','Нов.')
    })

    it('Вибір Товару з модалки Каталог', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(8) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.get('.styles-m__header---2z2EP').find(':nth-child(1) > .ant-btn').should('have.text','Повернення постачальнику')
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.get('.ant-table-row > :nth-child(1) > .ant-btn').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(0).should('have.text','')
        cy.get('.ant-modal-body').find('.ant-input').first().type(idProduct) 
        cy.get('.ant-modal-body').find('.ant-input-number-input').eq(1).clear().type('10.9') 
        cy.wait(2000);
        cy.get('.ant-modal-body').find('.ant-input').last().click()
        cy.get('.ant-modal-header').last().should('have.text','Вибір комірки')
        cy.get('[data-row-key] > :nth-child(8) > .ant-btn').first().click({force: true})
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

    it('Відображення трансфера в списку Витрат на Складі ', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
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
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
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