# Van Orgânicos - Sistema de Autenticação

Este projeto implementa um sistema completo de autenticação para o site Van Orgânicos, incluindo login, registro e gerenciamento de usuários.

## 🚀 Funcionalidades

- **Sistema de Login**: Autenticação com email e senha
- **Sistema de Registro**: Cadastro de novos usuários
- **Autenticação JWT**: Tokens seguros para sessões
- **Interface Responsiva**: Design moderno e adaptável
- **Testes Automatizados**: Testes Cypress para todas as funcionalidades
- **Persistência de Sessão**: Login mantido após recarregar a página

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. **Clone o repositório** (se aplicável):
```bash
git clone <url-do-repositorio>
cd Final_Project_M20
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Inicie o servidor**:
```bash
npm start
```

4. **Acesse a aplicação**:
```
http://localhost:3000
```

## 🔧 Configuração

### Variáveis de Ambiente

O projeto usa um arquivo `config.js` para configurações. As principais configurações são:

- `JWT_SECRET`: Chave secreta para assinatura dos tokens JWT
- `PORT`: Porta onde o servidor irá rodar (padrão: 3000)

### Usuários Padrão

O sistema vem com dois usuários pré-configurados:

1. **Administrador**:
   - Email: `admin@vanorganicos.com`
   - Senha: `password`
   - Role: `admin`

2. **Cliente Teste**:
   - Email: `cliente@teste.com`
   - Senha: `password`
   - Role: `user`

## 🧪 Testes

### Executar Testes Cypress

```bash
# Abrir interface do Cypress
npm run cy:open

# Executar testes em modo headless
npm test
```

### Testes Disponíveis

- **Testes de Autenticação** (`cypress/e2e/auth.cy.js`):
  - Login com credenciais válidas
  - Registro de novos usuários
  - Validação de formulários
  - Navegação entre modais
  - Persistência de sessão

- **Testes de Carrinho** (`cypress/e2e/login.cy.js`):
  - Adição de produtos
  - Gerenciamento de quantidade
  - Finalização de compra

## 📁 Estrutura do Projeto

```
Final_Project_M20/
├── server.js              # Servidor Express com API
├── auth.js                # Lógica de autenticação frontend
├── script.js              # Lógica principal da aplicação
├── index.html             # Página principal
├── styles.css             # Estilos CSS
├── config.js              # Configurações
├── package.json           # Dependências e scripts
├── cypress/
│   └── e2e/
│       ├── auth.cy.js     # Testes de autenticação
│       └── login.cy.js    # Testes do carrinho
└── README.md              # Este arquivo
```

## 🔐 API Endpoints

### Autenticação

- `POST /api/register` - Registrar novo usuário
- `POST /api/login` - Fazer login
- `POST /api/logout` - Fazer logout
- `GET /api/profile` - Obter perfil do usuário (protegido)
- `GET /api/verify-token` - Verificar validade do token
- `GET /api/users` - Listar usuários (apenas admin)

### Exemplo de Uso da API

```javascript
// Login
const response = await fetch('http://localhost:3000/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'cliente@teste.com',
    password: 'password'
  })
});

const data = await response.json();
console.log(data.token); // Token JWT
```

## 🎨 Interface do Usuário

### Elementos de Autenticação

- **Botões de Login/Registro**: Visíveis quando não autenticado
- **Informações do Usuário**: Exibe nome do usuário logado
- **Modais**: Interface para login e registro
- **Notificações**: Feedback visual para ações do usuário

### Fluxo de Autenticação

1. **Usuário não autenticado**: Vê botões "Entrar" e "Cadastrar"
2. **Clicar em "Entrar"**: Abre modal de login
3. **Preencher credenciais**: Email e senha
4. **Login bem-sucedido**: Modal fecha, mostra nome do usuário
5. **Logout**: Remove sessão, volta aos botões de login

## 🔒 Segurança

- **Senhas criptografadas**: Usando bcrypt
- **Tokens JWT**: Autenticação stateless
- **Validação de entrada**: Verificação de dados do usuário
- **CORS configurado**: Para requisições cross-origin
- **Headers de segurança**: Configurações adequadas

## 🚀 Desenvolvimento

### Modo de Desenvolvimento

```bash
npm run dev
```

Isso inicia o servidor com nodemon para reinicialização automática.

### Estrutura de Dados

```javascript
// Usuário
{
  id: number,
  email: string,
  password: string, // Hash bcrypt
  name: string,
  role: 'user' | 'admin'
}

// Token JWT
{
  userId: number,
  email: string,
  role: string,
  exp: number
}
```

## 📝 Notas Importantes

- **Sem banco de dados**: Os dados são armazenados em memória
- **Dados temporários**: Usuários são perdidos ao reiniciar o servidor
- **Desenvolvimento**: Sistema adequado para desenvolvimento e testes
- **Produção**: Recomenda-se implementar banco de dados real

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 📞 Suporte

Para dúvidas ou problemas, entre em contato através do email: contato@vanorganicos.com
