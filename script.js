// Troca de seções com transição
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const destino = link.getAttribute('href').replace('#', '');

    // Atualiza negrito da navegação
    document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('ativo'));
    link.classList.add('ativo');

    const atual = document.querySelector('.secao.ativa');
    const nova = document.getElementById(destino);

    if (atual !== nova) {
      // Transição de saída
      atual.classList.remove('ativa');
      atual.classList.add('escondida');

      setTimeout(() => {
        atual.classList.remove('escondida');
        atual.classList.remove('projetos-animada');
        nova.classList.add('ativa');

        // Ativa animação se for a seção de projetos
        if (nova.id === 'projetos') {
          void nova.offsetWidth;
          nova.classList.add('projetos-animada');
        }

        // Volta ao topo da seção ao trocar
        const conteudo = document.querySelector('.conteudo');
        conteudo.scrollTop = 0;

        atualizarScroll();
      }, 500);
    }
  });
});

// Alternância de modo escuro/claro
const btnModo = document.getElementById('modo-toggle');
const iconModo = document.getElementById('modo-icon');
const textoModo = document.getElementById('modo-texto');
const body = document.body;

// Sempre inicia no modo claro
body.classList.remove('dark');
atualizarModoBtn(false);

if (btnModo) {
  btnModo.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark');
    atualizarModoBtn(isDark);
  });
}

// Função auxiliar para atualizar ícone + texto
function atualizarModoBtn(isDark) {
  if (iconModo) iconModo.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  if (textoModo) textoModo.textContent = isDark ? 'Modo Claro' : 'Modo Escuro';
}

// Verifica e ativa/desativa scroll por seção
function atualizarScroll() {
  const conteudo = document.querySelector('.conteudo');
  const ativa = document.querySelector('.secao.ativa');

  if (ativa.scrollHeight > conteudo.clientHeight) {
    conteudo.style.overflowY = 'auto';
  } else {
    conteudo.style.overflowY = 'hidden';
  }
}

// Marca link inicial como ativo
document.querySelector('.nav-links a[href="#sobre"]').classList.add('ativo');

// Roda ao carregar a página
window.addEventListener('load', atualizarScroll);
