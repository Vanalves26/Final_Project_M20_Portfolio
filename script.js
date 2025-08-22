// Dados dos produtos orgânicos
const products = [
    {
        id: 1,
        name: "Tomate Orgânico",
        description: "Tomates frescos cultivados sem agrotóxicos",
        price: 8.90,
        image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=300&fit=crop&crop=center"
    },
    {
        id: 2,
        name: "Alface Orgânica",
        description: "Alface crespa orgânica, fresca e crocante",
        price: 4.50,
        image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop&crop=center"
    },
    {
        id: 3,
        name: "Cenoura Orgânica",
        description: "Cenouras doces e nutritivas",
        price: 6.80,
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop&crop=center"
    },
    {
        id: 4,
        name: "Maçã Orgânica",
        description: "Maçãs vermelhas orgânicas",
        price: 12.90,
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop&crop=center"
    },
    {
        id: 5,
        name: "Banana Orgânica",
        description: "Bananas prata orgânicas",
        price: 7.50,
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop&crop=center"
    },
    {
        id: 6,
        name: "Brócolis Orgânico",
        description: "Brócolis fresco e nutritivo",
        price: 9.90,
        image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=300&fit=crop&crop=center"
    },
    {
        id: 7,
        name: "Abacate Orgânico",
        description: "Abacates maduros e cremosos",
        price: 15.80,
        image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop&crop=center"
    },
    {
        id: 8,
        name: "Pepino Orgânico",
        description: "Pepinos frescos e crocantes",
        price: 5.90,
        image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=300&fit=crop&crop=center"
    }
];

// Classe para gerenciar o carrinho de compras
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadFromStorage();
        this.updateCartCount();
    }

    // Adicionar produto ao carrinho (R01)
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartCount();
        this.updateCartDisplay();
        this.showNotification(`${product.name} adicionado ao carrinho!`);
    }

    // Remover produto do carrinho (R02)
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartCount();
        this.updateCartDisplay();
        this.showNotification('Produto removido do carrinho!');
    }

    // Alterar quantidade de produto (R03)
    updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeItem(productId);
            return;
        }
        
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveToStorage();
            this.updateCartCount();
            this.updateCartDisplay();
        }
    }

    // Limpar carrinho (R07)
    clearCart() {
        this.items = [];
        this.saveToStorage();
        this.updateCartCount();
        this.updateCartDisplay();
        this.showNotification('Carrinho limpo!');
    }

    // Calcular total do carrinho (R05)
    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    // Persistência temporária usando localStorage (R06)
    saveToStorage() {
        localStorage.setItem('vanOrganicosCart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const savedCart = localStorage.getItem('vanOrganicosCart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
        }
    }

    // Atualizar contador do carrinho
    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        const totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    // Atualizar exibição do carrinho (R04)
    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        if (this.items.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
        } else {
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}" loading="lazy"
                             onerror="this.src='data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 60 60\'><rect fill=\'%232ecc71\' width=\'60\' height=\'60\'/><text x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\' fill=\'white\' font-size=\'10\' font-family=\'Arial\'>${item.name}</text></svg>'">
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button class="remove-item" onclick="cart.removeItem(${item.id})">Remover</button>
                    </div>
                </div>
            `).join('');
        }
        
        cartTotal.textContent = `R$ ${this.getTotal().toFixed(2)}`;
    }

    // Mostrar notificação
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #2ecc71;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 3000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }
}

// Instância global do carrinho
const cart = new ShoppingCart();

// Função para formatar preço
function formatPrice(price) {
    return `R$ ${price.toFixed(2)}`;
}

// Função para renderizar produtos
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" 
                     onload="this.parentElement.classList.add('loaded')"
                     onerror="this.src='data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 400 300\'><rect fill=\'%232ecc71\' width=\'400\' height=\'300\'/><text x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\' fill=\'white\' font-size=\'24\' font-family=\'Arial\'>${product.name}</text></svg>'; this.parentElement.classList.add('loaded')">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${formatPrice(product.price)}</div>
                <button class="add-to-cart" onclick="cart.addItem(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `).join('');
}

// Função para abrir/fechar carrinho
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('open');
    
    if (cartSidebar.classList.contains('open')) {
        cart.updateCartDisplay();
    }
}

// Função para abrir modal de pagamento (R08)
function openPaymentModal() {
    if (cart.items.length === 0) {
        cart.showNotification('Adicione produtos ao carrinho primeiro!');
        return;
    }
    
    const paymentModal = document.getElementById('paymentModal');
    const orderSummary = document.getElementById('orderSummary');
    const orderTotal = document.getElementById('orderTotal');
    
    // Renderizar resumo do pedido
    orderSummary.innerHTML = cart.items.map(item => `
        <div class="order-item">
            <span>${item.name} x${item.quantity}</span>
            <span>${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join('');
    
    orderTotal.textContent = formatPrice(cart.getTotal());
    
    paymentModal.classList.add('open');
}

// Função para fechar modal de pagamento
function closePaymentModal() {
    const paymentModal = document.getElementById('paymentModal');
    paymentModal.classList.remove('open');
}

// Função para processar pagamento (R08, R09)
function processPayment(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const cardName = document.getElementById('cardName').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const cardExpiry = document.getElementById('cardExpiry').value;
    const cardCvv = document.getElementById('cardCvv').value;
    const phone = document.getElementById('phone').value;
    
    // Validação básica
    if (!cardName || !cardNumber || !cardExpiry || !cardCvv || !phone) {
        cart.showNotification('Por favor, preencha todos os campos!');
        return;
    }
    
    // Simular processamento de pagamento
    cart.showNotification('Processando pagamento...');
    
    setTimeout(() => {
        closePaymentModal();
        showSuccessModal();
        sendSMSConfirmation(phone);
    }, 2000);
}

// Função para mostrar modal de sucesso
function showSuccessModal() {
    const successModal = document.getElementById('successModal');
    const successOrderDetails = document.getElementById('successOrderDetails');
    
    // Detalhes do pedido
    successOrderDetails.innerHTML = `
        <h4>Detalhes do Pedido:</h4>
        ${cart.items.map(item => `
            <p>${item.name} - ${item.quantity}x - ${formatPrice(item.price * item.quantity)}</p>
        `).join('')}
        <p><strong>Total: ${formatPrice(cart.getTotal())}</strong></p>
    `;
    
    successModal.classList.add('open');
}

// Função para fechar modal de sucesso
function closeSuccessModal() {
    const successModal = document.getElementById('successModal');
    successModal.classList.remove('open');
}

// Função para continuar comprando
function continueShopping() {
    closeSuccessModal();
    cart.clearCart();
}

// Função para enviar SMS de confirmação (R09)
function sendSMSConfirmation(phone) {
    // Simulação de envio de SMS
    console.log(`SMS enviado para ${phone}: "Seu pedido no Van Orgânicos foi confirmado! Total: ${formatPrice(cart.getTotal())}. Obrigado pela compra!"`);
    
    // Em um ambiente real, aqui seria feita a integração com um serviço de SMS
    // como Twilio, AWS SNS, ou similar
}

// Função para formatar entrada de cartão
function formatCardInput(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (input.id === 'cardNumber') {
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        input.value = value.substring(0, 19);
    } else if (input.id === 'cardExpiry') {
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        input.value = value;
    } else if (input.id === 'cardCvv') {
        input.value = value.substring(0, 3);
    }
}

// Função para formatar telefone
function formatPhone(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length >= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 7) {
        value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length >= 2) {
        value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    }
    
    input.value = value;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar produtos
    renderProducts();
    
    // Event listeners para carrinho
    document.getElementById('cartIcon').addEventListener('click', toggleCart);
    document.getElementById('closeCart').addEventListener('click', toggleCart);
    document.getElementById('cartOverlay').addEventListener('click', toggleCart);
    
    // Event listeners para botões do carrinho
    document.getElementById('checkoutBtn').addEventListener('click', openPaymentModal);
    document.getElementById('clearCartBtn').addEventListener('click', () => {
        if (confirm('Tem certeza que deseja limpar o carrinho?')) {
            cart.clearCart();
        }
    });
    
    // Event listeners para modais
    document.getElementById('closePaymentModal').addEventListener('click', closePaymentModal);
    document.getElementById('paymentForm').addEventListener('submit', processPayment);
    document.getElementById('continueShoppingBtn').addEventListener('click', continueShopping);
    
    // Event listeners para formatação de inputs
    document.getElementById('cardNumber').addEventListener('input', function() {
        formatCardInput(this);
    });
    
    document.getElementById('cardExpiry').addEventListener('input', function() {
        formatCardInput(this);
    });
    
    document.getElementById('cardCvv').addEventListener('input', function() {
        formatCardInput(this);
    });
    
    document.getElementById('phone').addEventListener('input', function() {
        formatPhone(this);
    });
    
    // Fechar modais ao clicar fora
    document.getElementById('paymentModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closePaymentModal();
        }
    });
    
    document.getElementById('successModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeSuccessModal();
        }
    });
    
    // Smooth scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Adicionar estilos CSS para animações
const cartStyle = document.createElement('style');
cartStyle.textContent = `
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
    
    .empty-cart {
        text-align: center;
        color: #7f8c8d;
        padding: 2rem;
        font-style: italic;
    }
`;
document.head.appendChild(cartStyle);
