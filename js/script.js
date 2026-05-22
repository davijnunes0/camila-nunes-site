/* ============================================
   CAMILA NUNES ADVOCACIA — SCRIPTS
   Direito Previdenciário · OAB/GO 67.408
   ============================================ */

/* ============================================
   CONFIGURAÇÃO — ALTERE AQUI
   ============================================ */
// Fonte unica de config usada pelo envio do formulario e integracoes.
const CONFIG = {
  // ⚠️ ALTERE para o WhatsApp real da Dra. Camila (formato: 55 + DDD + número, sem símbolos)
  whatsappNumber: '556284359291',

  // Endpoint do back-end para enviar e-mails (opcional — veja instruções no final do arquivo)
  // Deixe vazio para usar APENAS WhatsApp
  formEndpoint: '',
};

/* ============================================
   1. ANIMAÇÕES DE SCROLL (REVEAL)
   ============================================ */
// Observa elementos .reveal e aplica classe quando entram no viewport.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 6 * 0.08) + 's';
  revealObserver.observe(el);
});

/* ============================================
   2. MENU MOBILE
   ============================================ */
// Toggle do menu e fechamento ao clicar em links.
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.getElementById('navLinks');

if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Fechar menu ao clicar em um link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

/* ============================================
   3. NAVEGAÇÃO — EFEITO DE SCROLL
   ============================================ */
// Ajusta o background do topo conforme a rolagem.
const topNav = document.getElementById('topNav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    topNav.style.background = 'rgba(10, 10, 10, 0.95)';
  } else {
    topNav.style.background = 'rgba(10, 10, 10, 0.85)';
  }
});

/* ============================================
   4. FORMULÁRIO DE CONTATO
   ============================================ */
// Intercepta submit, valida e dispara WhatsApp/back-end.
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Captura os dados do formulário
    const formData = {
      nome: document.getElementById('nome').value.trim(),
      telefone: document.getElementById('tel').value.trim(),
      email: document.getElementById('email').value.trim(),
      assunto: document.getElementById('assunto').value,
      mensagem: document.getElementById('msg').value.trim(),
    };

    // Validação básica
    if (!formData.nome || !formData.telefone || !formData.email || !formData.assunto) {
      showFormMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
      return;
    }

    if (!isValidEmail(formData.email)) {
      showFormMessage('Por favor, insira um e-mail válido.', 'error');
      return;
    }

    // Desabilita botão durante envio
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
      // OPÇÃO 1: Envio via WhatsApp (padrão — funciona imediatamente)
      sendViaWhatsApp(formData);

      // OPÇÃO 2: Envio via back-end/e-mail (se configurado)
      if (CONFIG.formEndpoint) {
        await sendViaBackend(formData);
      }

      showFormMessage(
        'Mensagem enviada! Você será redirecionado(a) ao WhatsApp para finalizar o atendimento.',
        'success'
      );
      contactForm.reset();
    } catch (err) {
      console.error('Erro ao enviar formulário:', err);
      showFormMessage(
        'Não foi possível enviar pelo servidor, mas abrimos o WhatsApp para você. Se preferir, ligue para ' +
        formatPhone(CONFIG.whatsappNumber),
        'error'
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar Mensagem →';
    }
  });
}

/* ============================================
   FUNÇÕES AUXILIARES DO FORMULÁRIO
   ============================================ */
// Helpers de envio, validacao e feedback visual.

// Envia os dados via WhatsApp (abre conversa pronta com mensagem)
function sendViaWhatsApp(data) {
  const text =
    `*Nova solicitação pelo site*\n\n` +
    `*Nome:* ${data.nome}\n` +
    `*Telefone:* ${data.telefone}\n` +
    `*E-mail:* ${data.email}\n` +
    `*Assunto:* ${data.assunto}\n\n` +
    `*Mensagem:*\n${data.mensagem || '(sem mensagem)'}`;

  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;

  // Abre em nova aba
  window.open(url, '_blank');
}

// Envia os dados para um back-end (se configurado)
async function sendViaBackend(data) {
  const response = await fetch(CONFIG.formEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Servidor retornou ${response.status}`);
  }

  return await response.json();
}

// Valida formato do e-mail
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Formata número de telefone para exibição
function formatPhone(num) {
  // 556284359291 → 556284359291
  const m = num.match(/^55(\d{2})(\d)(\d{4})(\d{4})$/);
  return m ? `(${m[1]}) ${m[2]} ${m[3]}-${m[4]}` : num;
}

// Exibe mensagem de sucesso/erro abaixo do formulário
function showFormMessage(message, type) {
  let messageEl = document.querySelector('.form-message');

  if (!messageEl) {
    messageEl = document.createElement('div');
    messageEl.className = 'form-message';
    contactForm.appendChild(messageEl);
  }

  messageEl.textContent = message;
  messageEl.className = `form-message ${type}`;

  // Some após 6 segundos
  setTimeout(() => {
    messageEl.className = 'form-message';
  }, 6000);
}

/* ============================================
   📋 COMO OS DADOS DO FORMULÁRIO SÃO ENVIADOS
   ============================================

   ATUALMENTE (sem configuração extra):
   --------------------------------------
   Quando o visitante clica em "Enviar Mensagem", o JavaScript:
   1. Captura os dados preenchidos.
   2. Abre o WhatsApp da Dra. Camila (em nova aba) com uma mensagem
      pré-formatada contendo todos os dados.
   3. O visitante só precisa clicar em "enviar" no WhatsApp.

   Vantagens:
   ✅ Funciona sem servidor, sem custo, sem cadastro.
   ✅ O contato vai direto para o WhatsApp da advogada.
   ✅ A advogada pode responder imediatamente.

   ⚠️ IMPORTANTE: altere o número em CONFIG.whatsappNumber no início
   deste arquivo para o WhatsApp real da Dra. Camila!


   COMO RECEBER POR E-MAIL TAMBÉM (opcional):
   --------------------------------------
   Para receber os dados também por e-mail, você precisa de um back-end.
   Existem 3 caminhos fáceis:

   1) FORMSPREE (mais simples, gratuito até 50 envios/mês):
      a) Acesse https://formspree.io e crie uma conta
      b) Crie um novo "form" e copie o endpoint (ex: https://formspree.io/f/xxxxxx)
      c) Cole o endpoint em CONFIG.formEndpoint acima
      d) Pronto! Os dados chegam no e-mail cadastrado.

   2) WEB3FORMS (alternativa gratuita, sem limite):
      a) Acesse https://web3forms.com
      b) Pegue seu access_key
      c) Adapte a função sendViaBackend() para o formato deles

   3) BACK-END PRÓPRIO:
      Crie um endpoint que receba POST com JSON e envie o e-mail
      (Node.js + Nodemailer, PHP + PHPMailer, etc.) e cole a URL em
      CONFIG.formEndpoint.

   ============================================ */
