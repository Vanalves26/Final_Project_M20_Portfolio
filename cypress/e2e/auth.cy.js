describe('Sistema de Autenticação', () => {
  beforeEach(() => {
    // Arrange
    cy.visit('/')
    // Limpar localStorage antes de cada teste
    cy.clearLocalStorage()
  })

  it('Deve exibir os botões de login e registro quando não autenticado', () => {
    // Assert
    cy.get('#authButtons').should('be.visible')
    cy.get('#loginBtn').should('be.visible').and('contain.text', 'Entrar')
    cy.get('#registerBtn').should('be.visible').and('contain.text', 'Cadastrar')
    cy.get('#userInfo').should('not.be.visible')
  })

  it('Deve abrir o modal de login ao clicar no botão Entrar', () => {
    // Act
    cy.get('#loginBtn').click()

    // Assert
    cy.get('#loginModal').should('have.class', 'open')
    cy.get('#loginEmail').should('be.visible')
    cy.get('#loginPassword').should('be.visible')
  })

  it('Deve abrir o modal de registro ao clicar no botão Cadastrar', () => {
    // Act
    cy.get('#registerBtn').click()

    // Assert
    cy.get('#registerModal').should('have.class', 'open')
    cy.get('#registerName').should('be.visible')
    cy.get('#registerEmail').should('be.visible')
    cy.get('#registerPassword').should('be.visible')
    cy.get('#registerConfirmPassword').should('be.visible')
  })

  it('Deve fazer login com credenciais válidas', () => {
    // Act
    cy.get('#loginBtn').click()
    cy.get('#loginEmail').type('cliente@teste.com')
    cy.get('#loginPassword').type('password')
    cy.get('#loginForm').submit()

    // Assert
    cy.get('#userInfo').should('be.visible')
    cy.get('#userName').should('contain.text', 'Olá, Cliente Teste')
    cy.get('#authButtons').should('not.be.visible')
    cy.get('#loginModal').should('not.have.class', 'open')
  })

  it('Deve fazer login com credenciais de administrador', () => {
    // Act
    cy.get('#loginBtn').click()
    cy.get('#loginEmail').type('admin@vanorganicos.com')
    cy.get('#loginPassword').type('password')
    cy.get('#loginForm').submit()

    // Assert
    cy.get('#userInfo').should('be.visible')
    cy.get('#userName').should('contain.text', 'Olá, Administrador')
    cy.get('#authButtons').should('not.be.visible')
  })

  it('Deve exibir erro ao tentar fazer login com credenciais inválidas', () => {
    // Act
    cy.get('#loginBtn').click()
    cy.get('#loginEmail').type('email@invalido.com')
    cy.get('#loginPassword').type('senhaerrada')
    cy.get('#loginForm').submit()

    // Assert
    cy.get('#loginError').should('be.visible').and('contain.text', 'Email ou senha inválidos')
    cy.get('#userInfo').should('not.be.visible')
  })

  it('Deve exibir erro ao tentar fazer login com campos vazios', () => {
    // Act
    cy.get('#loginBtn').click()
    cy.get('#loginForm').submit()

    // Assert
    cy.get('#loginError').should('be.visible').and('contain.text', 'Email e senha são obrigatórios')
  })

  it('Deve fazer logout com sucesso', () => {
    // Arrange - Fazer login primeiro
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

  it('Deve navegar entre os modais de login e registro', () => {
    // Act - Abrir modal de login
    cy.get('#loginBtn').click()
    cy.get('#loginModal').should('have.class', 'open')

    // Act - Ir para modal de registro
    cy.get('#showRegisterModal').click()
    cy.get('#loginModal').should('not.have.class', 'open')
    cy.get('#registerModal').should('have.class', 'open')

    // Act - Voltar para modal de login
    cy.get('#showLoginModal').click()
    cy.get('#registerModal').should('not.have.class', 'open')
    cy.get('#loginModal').should('have.class', 'open')
  })

  it('Deve fechar os modais ao clicar no X', () => {
    // Act - Abrir e fechar modal de login
    cy.get('#loginBtn').click()
    cy.get('#closeLoginModal').click()
    cy.get('#loginModal').should('not.have.class', 'open')

    // Act - Abrir e fechar modal de registro
    cy.get('#registerBtn').click()
    cy.get('#closeRegisterModal').click()
    cy.get('#registerModal').should('not.have.class', 'open')
  })

  it('Deve fechar os modais ao clicar fora deles', () => {
    // Act - Abrir modal de login e clicar fora
    cy.get('#loginBtn').click()
    cy.get('#loginModal').click({ force: true })
    cy.get('#loginModal').should('not.have.class', 'open')

    // Act - Abrir modal de registro e clicar fora
    cy.get('#registerBtn').click()
    cy.get('#registerModal').click({ force: true })
    cy.get('#registerModal').should('not.have.class', 'open')
  })

  it('Deve registrar um novo usuário com sucesso', () => {
    // Act
    cy.get('#registerBtn').click()
    cy.get('#registerName').type('Novo Usuário')
    cy.get('#registerEmail').type('novo@usuario.com')
    cy.get('#registerPassword').type('123456')
    cy.get('#registerConfirmPassword').type('123456')
    cy.get('#registerForm').submit()

    // Assert
    cy.get('#userInfo').should('be.visible')
    cy.get('#userName').should('contain.text', 'Olá, Novo Usuário')
    cy.get('#authButtons').should('not.be.visible')
    cy.get('#registerModal').should('not.have.class', 'open')
  })

  it('Deve exibir erro ao registrar com senhas diferentes', () => {
    // Act
    cy.get('#registerBtn').click()
    cy.get('#registerName').type('Novo Usuário')
    cy.get('#registerEmail').type('novo@usuario.com')
    cy.get('#registerPassword').type('123456')
    cy.get('#registerConfirmPassword').type('654321')
    cy.get('#registerForm').submit()

    // Assert
    cy.get('#registerError').should('be.visible').and('contain.text', 'As senhas não coincidem')
    cy.get('#userInfo').should('not.be.visible')
  })

  it('Deve exibir erro ao registrar com senha muito curta', () => {
    // Act
    cy.get('#registerBtn').click()
    cy.get('#registerName').type('Novo Usuário')
    cy.get('#registerEmail').type('novo@usuario.com')
    cy.get('#registerPassword').type('123')
    cy.get('#registerConfirmPassword').type('123')
    cy.get('#registerForm').submit()

    // Assert
    cy.get('#registerError').should('be.visible').and('contain.text', 'A senha deve ter pelo menos 6 caracteres')
  })

  it('Deve exibir erro ao registrar com email já existente', () => {
    // Act
    cy.get('#registerBtn').click()
    cy.get('#registerName').type('Usuário Existente')
    cy.get('#registerEmail').type('cliente@teste.com') // Email já existe
    cy.get('#registerPassword').type('123456')
    cy.get('#registerConfirmPassword').type('123456')
    cy.get('#registerForm').submit()

    // Assert
    cy.get('#registerError').should('be.visible').and('contain.text', 'Email já cadastrado')
  })

  it('Deve manter o usuário logado após recarregar a página', () => {
    // Arrange - Fazer login
    cy.get('#loginBtn').click()
    cy.get('#loginEmail').type('cliente@teste.com')
    cy.get('#loginPassword').type('password')
    cy.get('#loginForm').submit()

    // Assert - Verificar se está logado
    cy.get('#userInfo').should('be.visible')
    cy.get('#userName').should('contain.text', 'Olá, Cliente Teste')

    // Act - Recarregar página
    cy.reload()

    // Assert - Verificar se ainda está logado
    cy.get('#userInfo').should('be.visible')
    cy.get('#userName').should('contain.text', 'Olá, Cliente Teste')
    cy.get('#authButtons').should('not.be.visible')
  })

  it('Deve limpar os formulários ao fechar os modais', () => {
    // Act - Preencher e fechar modal de login
    cy.get('#loginBtn').click()
    cy.get('#loginEmail').type('teste@email.com')
    cy.get('#loginPassword').type('senha123')
    cy.get('#closeLoginModal').click()
    cy.get('#loginBtn').click()

    // Assert - Verificar se os campos estão vazios
    cy.get('#loginEmail').should('have.value', '')
    cy.get('#loginPassword').should('have.value', '')

    // Act - Preencher e fechar modal de registro
    cy.get('#closeLoginModal').click()
    cy.get('#registerBtn').click()
    cy.get('#registerName').type('Nome Teste')
    cy.get('#registerEmail').type('teste@email.com')
    cy.get('#registerPassword').type('senha123')
    cy.get('#registerConfirmPassword').type('senha123')
    cy.get('#closeRegisterModal').click()
    cy.get('#registerBtn').click()

    // Assert - Verificar se os campos estão vazios
    cy.get('#registerName').should('have.value', '')
    cy.get('#registerEmail').should('have.value', '')
    cy.get('#registerPassword').should('have.value', '')
    cy.get('#registerConfirmPassword').should('have.value', '')
  })
})
