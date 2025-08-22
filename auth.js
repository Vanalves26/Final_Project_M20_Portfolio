// Configuração da API
const API_BASE_URL = 'http://localhost:3000/api';

// Classe para gerenciar autenticação
class AuthManager {
    constructor() {
        this.token = localStorage.getItem('authToken');
        this.user = JSON.parse(localStorage.getItem('user'));
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateUI();
        this.checkAuthStatus();
    }

    setupEventListeners() {
        // Botões de autenticação
        document.getElementById('loginBtn').addEventListener('click', () => this.showLoginModal());
        document.getElementById('registerBtn').addEventListener('click', () => this.showRegisterModal());
        document.getElementById('logoutBtn').addEventListener('click', () => this.logout());

        // Fechar modais
        document.getElementById('closeLoginModal').addEventListener('click', () => this.hideLoginModal());
        document.getElementById('closeRegisterModal').addEventListener('click', () => this.hideRegisterModal());

        // Formulários
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('registerForm').addEventListener('submit', (e) => this.handleRegister(e));

        // Navegação entre modais
        document.getElementById('showRegisterModal').addEventListener('click', (e) => {
            e.preventDefault();
            this.hideLoginModal();
            this.showRegisterModal();
        });

        document.getElementById('showLoginModal').addEventListener('click', (e) => {
            e.preventDefault();
            this.hideRegisterModal();
            this.showLoginModal();
        });

        // Fechar modais ao clicar fora
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideLoginModal();
                this.hideRegisterModal();
            }
        });
    }

    // Mostrar/ocultar modais
    showLoginModal() {
        document.getElementById('loginModal').classList.add('open');
        document.getElementById('loginEmail').focus();
    }

    hideLoginModal() {
        document.getElementById('loginModal').classList.remove('open');
        document.getElementById('loginForm').reset();
        document.getElementById('loginError').textContent = '';
    }

    showRegisterModal() {
        document.getElementById('registerModal').classList.add('open');
        document.getElementById('registerName').focus();
    }

    hideRegisterModal() {
        document.getElementById('registerModal').classList.remove('open');
        document.getElementById('registerForm').reset();
        document.getElementById('registerError').textContent = '';
    }

    // Atualizar interface baseada no status de autenticação
    updateUI() {
        const authButtons = document.getElementById('authButtons');
        const userInfo = document.getElementById('userInfo');
        const userName = document.getElementById('userName');

        if (this.user && this.token) {
            authButtons.style.display = 'none';
            userInfo.style.display = 'flex';
            userName.textContent = `Olá, ${this.user.name}`;
        } else {
            authButtons.style.display = 'flex';
            userInfo.style.display = 'none';
        }
    }

    // Verificar status de autenticação
    async checkAuthStatus() {
        if (!this.token) {
            this.updateUI();
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/verify-token`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (!response.ok) {
                this.logout();
            }
        } catch (error) {
            console.error('Erro ao verificar token:', error);
            this.logout();
        }
    }

    // Fazer login
    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const errorElement = document.getElementById('loginError');

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                this.token = data.token;
                this.user = data.user;
                
                localStorage.setItem('authToken', this.token);
                localStorage.setItem('user', JSON.stringify(this.user));
                
                this.hideLoginModal();
                this.updateUI();
                this.showNotification('Login realizado com sucesso!', 'success');
            } else {
                errorElement.textContent = data.message || 'Erro ao fazer login';
            }
        } catch (error) {
            console.error('Erro no login:', error);
            errorElement.textContent = 'Erro de conexão. Tente novamente.';
        }
    }

    // Fazer registro
    async handleRegister(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        const errorElement = document.getElementById('registerError');

        // Validação de senha
        if (password !== confirmPassword) {
            errorElement.textContent = 'As senhas não coincidem';
            return;
        }

        if (password.length < 6) {
            errorElement.textContent = 'A senha deve ter pelo menos 6 caracteres';
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                this.token = data.token;
                this.user = data.user;
                
                localStorage.setItem('authToken', this.token);
                localStorage.setItem('user', JSON.stringify(this.user));
                
                this.hideRegisterModal();
                this.updateUI();
                this.showNotification('Conta criada com sucesso!', 'success');
            } else {
                errorElement.textContent = data.message || 'Erro ao criar conta';
            }
        } catch (error) {
            console.error('Erro no registro:', error);
            errorElement.textContent = 'Erro de conexão. Tente novamente.';
        }
    }

    // Fazer logout
    logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        this.updateUI();
        this.showNotification('Logout realizado com sucesso!', 'info');
    }

    // Obter token para requisições autenticadas
    getAuthHeaders() {
        return {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        };
    }

    // Verificar se está autenticado
    isAuthenticated() {
        return !!(this.token && this.user);
    }

    // Obter dados do usuário
    getUser() {
        return this.user;
    }

    // Mostrar notificação
    showNotification(message, type = 'info') {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 3000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Inicializar gerenciador de autenticação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
});

// Adicionar estilos CSS para animações
const authStyle = document.createElement('style');
authStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(authStyle);
