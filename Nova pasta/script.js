const slides = document.querySelectorAll('.slide');
const btnAnterior = document.querySelector('.btn-anterior');
const btnProximo = document.querySelector('.btn-proximo');
const btnTopo = document.getElementById('btnTopo');
const form = document.querySelector('form');
const msgConfirmacao = document.getElementById('msgConfirmacao');

let indiceAtual = 0;

function mostrarSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('ativo', i === index);
  });
}

btnProximo.addEventListener('click', () => {
  indiceAtual = (indiceAtual + 1) % slides.length;
  mostrarSlide(indiceAtual);
});

btnAnterior.addEventListener('click', () => {
  indiceAtual = (indiceAtual - 1 + slides.length) % slides.length;
  mostrarSlide(indiceAtual);
});

// Trocar slide automaticamente a cada 8 segundos
setInterval(() => {
  indiceAtual = (indiceAtual + 1) % slides.length;
  mostrarSlide(indiceAtual);
}, 10000);

// Botão voltar ao topo
btnTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Formulário - enviar mensagem via Formspree
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      msgConfirmacao.style.display = 'block';
      form.reset();
      setTimeout(() => {
        msgConfirmacao.style.display = 'none';
      }, 5000);
    } else {
      alert('Erro ao enviar a mensagem. Tente novamente.');
    }
  }).catch(() => {
    alert('Erro ao enviar a mensagem. Tente novamente.');
  });
});
