describe('Fluxo completo: adicionar e abrir carrinho', () => {
  beforeEach(() =>{
    //Arrange
    cy.visit('/')
    

  })

  it.only('Deve adicionar produtos e abrir o carrinho', () => {
    
    //Act
        cy.adicionarProdutosNoCarrinho()
    

    //Assert
    //cy.get(':nth-child(9)').should('have.text', 'Tomate Orgânico adicionado ao carrinho!')
    //cy.get('.notification').should('be.visible').should('have.text', 'Alface Orgânica adicionado ao carrinho!')
    cy.verificarMensagemNotification('Tomate Orgânico adicionado ao carrinho!')
    //cy.verificarMensagemNotification('Alface Orgânica adicionado ao carrinho!')
    
  })

  it('Deve clicar no botão "+" para adicionar o Item selecionado de dentro do modal do carrinho', () => {


    //Act
    cy.adicionarProdutosNoCarrinho()
    cy.get('#cartSidebar').should('have.class', 'open').scrollIntoView().should('be.visible')
    cy.get('[onclick="cart.updateQuantity(1, 2)"]').should('be.visible').click()
    cy.get('[onclick="cart.updateQuantity(1, 3)"]').should('be.visible').click()

    //Assert
    // Verifica se a mensagem de produto adicionado ao carrinho é exibida
    cy.get(':nth-child(9)').should('have.text', 'Tomate Orgânico adicionado ao carrinho!')

  })

  it('Deve clicar no botão "-" para deletar o Item selecionado de dentro do modal do carrinho', () => {


    //Act
    cy.adicionarProdutosNoCarrinho()
    cy.get('#cartSidebar').should('have.class', 'open').scrollIntoView().should('be.visible')
    cy.get('[onclick="cart.updateQuantity(1, 0)"]').should('be.visible').click()

    //Assert
    // Verifica se a mensagem de produto removido do carrinho é exibida
    cy.get(':nth-child(9)').should('have.text', 'Produto removido do carrinho!')

  })

  it('Deve remover toda a lista de itens do carrinho', () => {

    //Act
    cy.get(':nth-child(1) > .product-info > .add-to-cart').should('be.visible').click()
    cy.get(':nth-child(2) > .product-info > .add-to-cart').should('be.visible').click()
    cy.get('#cartIcon').should('be.visible').click()
    cy.get('#cartSidebar').should('have.class', 'open').scrollIntoView().should('be.visible')
    //cy.get('.remove-item').should('be.visible').click(({ multiple: true }))

    //Assert
    // Verifica se a mensagem de produto removido do carrinho é exibida
    //cy.get(':nth-child(9)').should('have.text', 'Produto removido do carrinho!')

  })


  it('Deve abrir o carrinho e verificar se os produtos estão visíveis', () => {

    //Act
    cy.adicionarProdutosNoCarrinho()
    
    //Assert
  
    cy.get('[data-id="1"]').should('be.visible').wait(400).should('contain.text', 'Tomate Orgânico')
    //cy.get('[data-id="2"]').should('be.visible').should('contain.text', 'Alface Orgânica')
  })

  it('Deve clicar no botão  Limpar carrinho', () => {

    //Act
    cy.get('#cartIcon').should('be.visible').click()
    cy.get('#cartSidebar').should('have.class', 'open').scrollIntoView().should('be.visible')
    cy.get('#clearCartBtn').click()
    cy.get('#closeCart > .fas').click()

    //Assert
    // Verifica se a mensagem de produto removido do carrinho é exibida
    cy.get('.notification').should('be.visible').wait(200).should('have.text', 'Carrinho limpo!')

  })
  it('Deve clicar no botão Finalizar a compra', () => {

    //Act
    cy.adicionarProdutosNoCarrinho()
    cy.get('#checkoutBtn').should('be.visible').click()

    //Assert
    // Verifica se a mensagem de produto removido do carrinho é exibida
    //cy.get('.notification').should('be.visible').wait(200).should('have.text', 'Carrinho limpo!')

  })

  it('Deve clicar no botão Confirmar pagamento', () => {

  
    //Act
    cy.adicionarProdutosNoCarrinho()
    cy.get('#checkoutBtn').should('be.visible').click()
    cy.get('#cardName').click().type('Hebe Camargo')
    cy.get('#cardNumber').click().type('5394 6608 0221 0736')
    cy.get('#cardExpiry').click().type('08/26')
    cy.get('#cardCvv').click().type('694')
    cy.get('#phone').click().type('11970868545')
    cy.get('#paymentForm > .btn').click()


    //Assert
    // Verifica se a mensagem do pedido processado é exibida
    cy.get('.success-content > :nth-child(2)').should('be.visible').wait(200).should('have.text', 'Seu pedido foi processado com sucesso!')

  })

  it('Deve clicar no botão Continuar comprando e voltar a página inicial', () => {

  
    //Act

    cy.adicionarProdutosNoCarrinho()
    cy.get('#checkoutBtn').should('be.visible').click()
    cy.get('#cardName').click().type('Hebe Camargo')
    cy.get('#cardNumber').click().type('5394 6608 0221 0736')
    cy.get('#cardExpiry').click().type('08/26')
    cy.get('#cardCvv').click().type('694')
    cy.get('#phone').click().type('11970868545')
    cy.get('#paymentForm > .btn').click()
    cy.get('#continueShoppingBtn').should('be.visible').wait(400).click()
    cy.get('#closeCart > .fas').should('be.visible').click()



    //Assert
    // Verifica se após a compra finalizada a mensagem de Carrinho Limpo! é exibida
    cy.get('.notification').should('be.visible').should('have.text', 'Carrinho limpo!')

  })

})