// ============ MENU MOBILE ============
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
});

// ============ SCROLL SUAVE + LINK ATIVO ============
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    // Header com sombra
    const header = document.getElementById('header');
    header.style.boxShadow = scrollY > 50 
        ? '0 4px 20px rgba(0,0,0,0.1)' 
        : '0 2px 20px rgba(0,0,0,0.05)';
    
    // Link ativo
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ============ ANIMAÇÃO DOS NÚMEROS ============
const statNumbers = document.querySelectorAll('.stat-number');

const animateNumber = (el) => {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const update = () => {
        current += step;
        if (current < target) {
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            el.textContent = target;
        }
    };
    update();
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumber(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(num => observer.observe(num));

// ============ TILES INTERATIVOS ============
const tiles = document.querySelectorAll('.tile');

tiles.forEach(tile => {
    tile.addEventListener('click', () => {
        const isExpanded = tile.classList.contains('expanded');
        
        // Fecha todos
        tiles.forEach(t => t.classList.remove('expanded'));
        
        // Abre o clicado (se não estava aberto)
        if (!isExpanded) {
            tile.classList.add('expanded');
            tile.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});

// ============ CALCULADORA DE PEGADA HÍDRICA ============
const calcForm = document.getElementById('calcForm');
const totalLitros = document.getElementById('totalLitros');
const resultText = document.getElementById('resultText');

calcForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const banho = parseInt(document.getElementById('banho').value) * 80;
    const escova = parseInt(document.getElementById('escova').value) * 12;
    const descarga = parseInt(document.getElementById('descarga').value) * 6;
    const louca = parseInt(document.getElementById('louca').value) * 100;
    
    const total = banho + escova + descarga + louca;
    
    // Animação do número
    let current = 0;
    const step = total / 60;
    const animar = () => {
        current += step;
        if (current < total) {
            totalLitros.textContent = Math.floor(current);
            requestAnimationFrame(animar);
        } else {
            totalLitros.textContent = total;
        }
    };
    animar();
    
    // Mensagem
    if (total < 150) {
        resultText.textContent = '🌟 Excelente! Você é um guardião da água!';
    } else if (total < 250) {
        resultText.textContent = '💚 Bom consumo! Pequenas mudanças ajudam ainda mais.';
    } else if (total < 400) {
        resultText.textContent = '⚠️ Atenção: tente reduzir banhos e fechar a torneira.';
    } else {
        resultText.textContent = '🚨 Consumo alto! Repense seus hábitos hídricos.';
    }
});

// ============ QUIZ ============
const perguntas = [
    {
        q: "O que significa a sigla ILPF?",
        opcoes: [
            "Irrigação Local de Plantio Florestal",
            "Integração Lavoura-Pecuária-Floresta",
            "Indústria de Laticínios e Produtos Florestais",
            "Instituto de Lavouras do Paraná e Floresta"
        ],
        correta: 1
    },
    {
        q: "Qual prática conserva o solo ao não revolvé-lo?",
        opcoes: [
            "Queimada controlada",
            "Aragem profunda",
            "Plantio direto",
            "Monocultura intensiva"
        ],
        correta: 2
    },
    {
        q: "Qual a importância das abelhas na agricultura?",
        opcoes: [
            "Produzem apenas mel",
            "Polinizam cerca de 70% das culturas agrícolas",
            "Controlam pragas do solo",
            "Não têm relação com a agricultura"
        ],
        correta: 1
    },
    {
        q: "O que é agricultura de baixo carbono (ABC)?",
        opcoes: [
            "Agricultura que usa só carvão",
            "Práticas que reduzem emissões de gases de efeito estufa",
            "Plantio apenas em estufas",
            "Uso exclusivo de máquinas elétricas"
        ],
        correta: 1
    },
    {
        q: "Quanto do território brasileiro é preservado como vegetação nativa?",
        opcoes: [
            "Cerca de 30%",
            "Cerca de 50%",
            "Cerca de 66%",
            "Cerca de 80%"
        ],
        correta: 2
    }
];

let perguntaAtual = 0;
let acertos = 0;

const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizFeedback = document.getElementById('quizFeedback');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const quizBox = document.getElementById('quizBox');
const quizResult = document.getElementById('quizResult');

function carregarPergunta() {
    const p = perguntas[perguntaAtual];
    quizQuestion.textContent = `${perguntaAtual + 1}. ${p.q}`;
    quizOptions.innerHTML = '';
    quizFeedback.textContent = '';
    nextBtn.style.display = 'none';
    
    progressBar.style.width = `${(perguntaAtual / perguntas.length) * 100}%`;
    
    p.opcoes.forEach((opcao, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = opcao;
        btn.addEventListener('click', () => responder(i, btn));
        quizOptions.appendChild(btn);
    });
}

function responder(escolha, btn) {
    const p = perguntas[perguntaAtual];
    const opcoes = document.querySelectorAll('.quiz-option');
    
    opcoes.forEach(o => o.disabled = true);
    
    if (escolha === p.correta) {
        btn.classList.add('correct');
        quizFeedback.textContent = '✅ Correto! Muito bem!';
        quizFeedback.style.color = 'var(--verde-medio)';
        acertos++;
    } else {
        btn.classList.add('wrong');
        opcoes[p.correta].classList.add('correct');
        quizFeedback.textContent = '❌ Ops! A resposta correta está destacada.';
        quizFeedback.style.color = '#c62828';
    }
    
    nextBtn.style.display = 'inline-block';
    nextBtn.textContent = perguntaAtual === perguntas.length - 1 ? 'Ver resultado' : 'Próxima →';
}

nextBtn.addEventListener('click', () => {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        mostrarResultado();
    }
});

function mostrarResultado() {
    quizBox.style.display = 'none';
    quizResult.style.display = 'block';
    
    const pct = (acertos / perguntas.length) * 100;
    const emoji = document.getElementById('resultEmoji');
    const title = document.getElementById('resultTitle');
    const msg = document.getElementById('resultMessage');
    
    if (pct === 100) {
        emoji.textContent = '🏆';
        title.textContent = 'Perfeito! Você é um expert!';
    } else if (pct >= 60) {
        emoji.textContent = '🌟';
        title.textContent = 'Muito bem!';
    } else {
        emoji.textContent = '📚';
        title.textContent = 'Continue aprendendo!';
    }
    
    msg.textContent = `Você acertou ${acertos} de ${perguntas.length} perguntas (${pct}%). O agro sustentável depende de conhecimento!`;
}

function restartQuiz() {
    perguntaAtual = 0;
    acertos = 0;
    quizBox.style.display = 'block';
    quizResult.style.display = 'none';
    carregarPergunta();
}

// Inicia o quiz
carregarPergunta();

// ============ ANIMAÇÃO AO SCROLL ============
const animarElementos = document.querySelectorAll('.tile, .tip-card, .stat');
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

animarElementos.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    scrollObserver.observe(el);
});
