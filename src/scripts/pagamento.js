document.addEventListener('DOMContentLoaded', function () {
    // Seleção de método de pagamento
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentForms = {
        'credit-card': document.getElementById('credit-card-form'),
        'boleto': document.getElementById('boleto-form'),
        'pix': document.getElementById('pix-form')
    };

    paymentMethods.forEach(method => {
        method.addEventListener('click', function () {
            const methodName = this.getAttribute('data-method');

            // Atualiza a seleção visual
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');

            // Mostra o formulário correspondente
            Object.values(paymentForms).forEach(form => form.classList.remove('active'));
            paymentForms[methodName].classList.add('active');
        });
    });

    // Formatação do número do cartão (para o formulário de cartão)
    const numeroCartao = document.getElementById('numeroCartao');
    if (numeroCartao) {
        numeroCartao.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\s+/g, '');
            if (value.length > 0) {
                value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
            }
            e.target.value = value;

            // Identifica o tipo de cartão e atualiza ícones
            const cardNumber = value.replace(/\s/g, '');
            const visaIcon = document.getElementById('visaIcon');
            const mastercardIcon = document.getElementById('mastercardIcon');
            const amexIcon = document.getElementById('amexIcon');

            // Reset all icons
            [visaIcon, mastercardIcon, amexIcon].forEach(icon => {
                icon?.classList.remove('active');
            });

            if (/^4/.test(cardNumber)) {
                visaIcon?.classList.add('active');
            } else if (/^5[1-5]/.test(cardNumber)) {
                mastercardIcon?.classList.add('active');
            } else if (/^3[47]/.test(cardNumber)) {
                amexIcon?.classList.add('active');
            }
        });
    }

    // Formatação da data de validade (para o formulário de cartão)
    const validade = document.getElementById('validade');
    if (validade) {
        validade.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }

    // Validação do formulário de cartão
    const creditCardForm = document.getElementById('credit-card-form');
    if (creditCardForm) {
        creditCardForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const mensagem = document.getElementById('credit-card-message');

            // Validações básicas
            if (numeroCartao.value.replace(/\s/g, '').length < 16) {
                mostrarMensagem('Por favor, insira um número de cartão válido.', 'error', mensagem);
                return;
            }

            if (document.getElementById('nomeCompleto').value.trim() === '') {
                mostrarMensagem('Por favor, insira seu nome completo.', 'error', mensagem);
                return;
            }

            if (validade.value.length < 5) {
                mostrarMensagem('Por favor, insira uma data de validade válida.', 'error', mensagem);
                return;
            }

            if (document.getElementById('cvv').value.length < 3) {
                mostrarMensagem('Por favor, insira um CVV válido.', 'error', mensagem);
                return;
            }

            // Simulação de pagamento bem-sucedido
            setTimeout(function () {
                mostrarMensagem('Pagamento processado com sucesso! Obrigado por escolher a Patrocínio Legal.', 'success', mensagem);
                creditCardForm.reset();
            }, 1000);
        });
    }

    // Botão de gerar boleto
    const generateBoletoBtn = document.getElementById('generate-boleto');
    if (generateBoletoBtn) {
        generateBoletoBtn.addEventListener('click', function (e) {
            e.preventDefault();
            alert('Boleto gerado com sucesso! Você será redirecionado para a página de impressão.');
            // Aqui você poderia redirecionar para o boleto ou mostrar um modal
        });
    }

    // Botão de confirmar PIX
    const confirmPixBtn = document.getElementById('confirm-pix');
    if (confirmPixBtn) {
        confirmPixBtn.addEventListener('click', function (e) {
            e.preventDefault();
            alert('Obrigado! Seu pagamento via PIX será confirmado em breve.');
        });
    }

    // Função auxiliar para mostrar mensagens
    function mostrarMensagem(texto, tipo, elemento) {
        elemento.textContent = texto;
        elemento.className = `alert alert-${tipo}`;
        elemento.style.display = 'block';

        setTimeout(function () {
            elemento.style.display = 'none';
        }, 5000);
    }
});

// Função para copiar chave PIX
function copyPixKey() {
    const pixKey = document.getElementById('pix-key');
    pixKey.select();
    pixKey.setSelectionRange(0, 99999);
    document.execCommand('copy');

    // Feedback visual
    const copyBtn = document.querySelector('.copy-btn');
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
    copyBtn.style.backgroundColor = '#27ae60';

    setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.backgroundColor = '';
    }, 2000);
}