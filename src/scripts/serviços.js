// script.js

document.addEventListener('DOMContentLoaded', function() {
  // ===== NAVEGAÇÃO ATIVA =====
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-app a');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    
    if (currentPage === linkHref) {
      link.classList.add('active');
      // Adiciona a seta indicadora
      const arrow = document.createElement('i');
      arrow.className = 'fas fa-arrow-right active-arrow';
      link.appendChild(arrow);
    }
    
    link.addEventListener('click', function(e) {
      // Remove a classe active de todos os links
      navLinks.forEach(navLink => {
        navLink.classList.remove('active');
        const existingArrow = navLink.querySelector('.active-arrow');
        if (existingArrow) {
          existingArrow.remove();
        }
      });
      
      // Adiciona a classe active ao link clicado
      this.classList.add('active');
      const arrow = document.createElement('i');
      arrow.className = 'fas fa-arrow-right active-arrow';
      this.appendChild(arrow);
    });
  });

  // ===== ANIMAÇÃO AO ROLAR =====
  const animateOnScroll = function() {
    const services = document.querySelectorAll('.service-card');
    
    services.forEach((service, index) => {
      const servicePosition = service.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (servicePosition < screenPosition) {
        setTimeout(() => {
          service.style.opacity = '1';
          service.style.transform = 'translateY(0)';
        }, index * 200);
      }
    });
  };
  
  // Define o estado inicial dos cards
  const services = document.querySelectorAll('.service-card');
  services.forEach(service => {
    service.style.opacity = '0';
    service.style.transform = 'translateY(30px)';
    service.style.transition = 'all 0.6s ease-out';
  });
  
  // Executa na carga inicial
  animateOnScroll();
  
  // Executa no scroll
  window.addEventListener('scroll', animateOnScroll);

  // ===== INTERAÇÃO COM OS CARDS DE SERVIÇOS =====
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    // Efeito hover
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      if (!this.classList.contains('featured')) {
        this.style.transform = 'translateY(0)';
      }
      this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
    
    // Clique no card
    card.addEventListener('click', function(e) {
      // Evita ação se clicar em um link dentro do card
      if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') {
        return;
      }
      
      const link = this.querySelector('.service-link');
      if (link) {
        window.location.href = link.getAttribute('href');
      }
    });
  });

  // ===== BOTÃO DE WHATSAPP FLUTUANTE =====
  const whatsappButton = document.createElement('div');
  whatsappButton.className = 'whatsapp-float';
  whatsappButton.innerHTML = `
    <a href="https://wa.me/5511999999999" target="_blank" aria-label="WhatsApp">
      <i class="fab fa-whatsapp"></i>
    </a>
  `;
  document.body.appendChild(whatsappButton);

  // ===== SCROLL SUAVE PARA LINKS INTERNOS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
});
