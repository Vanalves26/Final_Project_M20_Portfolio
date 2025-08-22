     Cypress.Commands.add('adicionarProdutosNoCarrinho', () => {
      
    cy.get(':nth-child(1) > .product-info > .add-to-cart').should('be.visible').click()
    //cy.get(':nth-child(2) > .product-info > .add-to-cart').should('be.visible').click()
    cy.get('#cartIcon').should('be.visible').click()

     })

     Cypress.Commands.add('verificarMensagemNotification', (mensagem) => {
      
    cy.get('.notification').should('be.visible').should('have.text', mensagem)

     })