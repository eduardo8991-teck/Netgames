/* ==========================================================
   NetGames — script.js
   Funcionalidades:
     1. Ano automático no rodapé
     2. Menu hamburguer (mobile)
     3. Fechar menu ao clicar em link
     4. Partículas decorativas no hero
     5. Scroll reveal (animação ao entrar na tela)
     6. Feedback visual no formulário
   ========================================================== */

/* ==========================================
   1. ANO AUTOMÁTICO NO RODAPÉ
   ========================================== */
const anoEl = document.getElementById('ano');
if (anoEl) {
  anoEl.textContent = new Date().getFullYear();
}


/* ==========================================
   2. MENU HAMBURGUER (MOBILE)
   ========================================== */
const hamburger = document.getElementById('hamburger');
const nav       = document.getElementById('nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });
}


/* ==========================================
   3. FECHAR MENU AO CLICAR EM UM LINK
   ========================================== */
nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger?.classList.remove('open');
  });
});


/* ==========================================
   4. PARTÍCULAS DECORATIVAS NO HERO
   Cria bolhas animadas de fundo usando CSS.
   Para desativar: remova ou comente este bloco.
   ========================================== */
const particlesContainer = document.getElementById('particles');

if (particlesContainer) {
  const colors = ['#00d4ff', '#b400ff', '#00ff88', '#ff2060'];
  const total  = 28; // quantidade de partículas

  for (let i = 0; i < total; i++) {
    const dot = document.createElement('div');
    dot.classList.add('particle');

    const size     = Math.random() * 8 + 3;         // 3–11px
    const color    = colors[Math.floor(Math.random() * colors.length)];
    const left     = Math.random() * 100;            // % horizontal
    const duration = Math.random() * 12 + 8;         // 8–20s
    const delay    = Math.random() * 10;             // 0–10s

    dot.style.cssText = `
      width:  ${size}px;
      height: ${size}px;
      background: ${color};
      left:   ${left}%;
      bottom: -20px;
      animation-duration:  ${duration}s;
      animation-delay:    -${delay}s;
      filter: blur(${size > 8 ? 2 : 0}px);
    `;

    particlesContainer.appendChild(dot);
  }
}


/* ==========================================
   5. SCROLL REVEAL
   Anima elementos ao entrarem na viewport.
   Basta adicionar a classe "reveal" ao HTML
   para qualquer elemento que queira animar.
   ========================================== */

// Adiciona a classe "reveal" automaticamente a cards e seções
const revealTargets = document.querySelectorAll(
  '.game-card, .section-header, .qr-inner, .form-wrapper'
);

revealTargets.forEach(el => el.classList.add('reveal'));

// Observador de intersecção
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // anima só uma vez
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ==========================================
   6. FEEDBACK VISUAL NO FORMULÁRIO
   Exibe mensagem após tentativa de envio.
   O FormSubmit redireciona a página após
   o envio real; este bloco só intercepta
   validação do navegador antes disso.
   ========================================== */
const form    = document.getElementById('form-sugestao');
const formMsg = document.getElementById('form-msg');

if (form && formMsg) {
  form.addEventListener('submit', (e) => {
    /* Validação básica adicional */
    const nome     = form.querySelector('#nome').value.trim();
    const email    = form.querySelector('#email').value.trim();
    const mensagem = form.querySelector('#mensagem').value.trim();

    if (!nome || !email || !mensagem) {
      e.preventDefault(); // impede envio se campo vazio
      formMsg.style.color = '#ff2060';
      formMsg.textContent = 'Por favor, preencha todos os campos.';
      return;
    }

    /*
      Se tudo estiver preenchido, o formulário segue o envio normal
      para o FormSubmit. A mensagem abaixo aparece brevemente antes
      do redirecionamento. Se não houver redirecionamento configurado,
      ela fica visível na tela.
    */
    formMsg.style.color = '#00ff88';
    formMsg.textContent = '✔ Mensagem enviada! Obrigado pela sugestão.';
  });
}


/* ==========================================
   EXTRA — HIGHLIGHT DO MENU ATIVO
   Marca o link do menu conforme a seção
   visível na tela durante a rolagem.
   ========================================== */
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--cyan)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));
