describe('Teste Simples de Autenticação', () => {
  it('Deve carregar a página e mostrar os botões de autenticação', () => {
    // Arrange & Act
    cy.visit('/')
    
    // Assert
    cy.get('#authButtons').should('be.visible')
    cy.get('#loginBtn').should('be.visible').and('contain.text', 'Entrar')
    cy.get('#registerBtn').should('be.visible').and('contain.text', 'Cadastrar')
  })

  it('Deve fazer login com sucesso', () => {
    // Arrange & Act
    cy.visit('/')
    cy.get('#loginBtn').click()
    cy.get('#loginEmail').type('cliente@teste.com')
    cy.get('#loginPassword').type('password')
    cy.get('#loginForm').submit()
    
    // Assert
    cy.get('#userInfo').should('be.visible')
    cy.get('#userName').should('contain.text', 'Olá, Cliente Teste')
  })

  it('Deve fazer logout com sucesso', () => {
    // Arrange - Fazer login primeiro
    cy.visit('/')
    cy.get('#loginBtn').click()
    cy.get('#loginEmail').type('cliente@teste.com')
    cy.get('#loginPassword').type('password')
    cy.get('#loginForm').submit()
    
    // Act - Fazer logout
    cy.get('#logoutBtn').click()
    
    // Assert
    cy.get('#authButtons').should('be.visible')
    cy.get('#userInfo').should('not.be.visible')
  })
})
