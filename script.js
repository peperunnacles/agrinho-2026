JavaScript
document.addEventListener("DOMContentLoaded", function () {
    
    // 1. EFEITO DE SCROLL SUAVE CORRIGIDO PARA NAVEGADORES ANTIGOS
    const linksDoMenu = document.querySelectorAll("nav ul li a");

    linksDoMenu.forEach(link => {
        link.addEventListener("click", function (evento) {
            // Verifica se o link é uma âncora interna (começa com #)
            const href = this.getAttribute("href");
            if (href.startsWith("#")) {
                evento.preventDefault(); // Impede o comportamento padrão de clique
                
                const secaoAlvo = document.querySelector(href);
                if (secaoAlvo) {
                    // Calcula a posição descontando a altura do header fixo
                    const topoHeader = 70; 
                    const posicaoAlvo = secaoAlvo.offsetTop - topoHeader;

                    window.scrollTo({
                        top: posicaoAlvo,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // 2. ANIMAÇÃO DE APARECIMENTO DAS SEÇÕES (SCROLL REVEAL)
    const secoes = document.querySelectorAll("main section");

    // Adiciona a classe 'hidden-section' em todas as seções dinamicamente
    secoes.forEach(secao => {
        secao.classList.add("hidden-section");
    });

    // Função que checa se o elemento está visível na tela
    function checarVisibilidade() {
        const gatilhoDeDisparo = window.innerHeight * 0.85; // Dispara quando a seção atinge 85% da tela

        secoes.forEach(secao => {
            const topoDaSecao = secao.getBoundingClientRect().top;

            if (topoDaSecao < gatilhoDeDisparo) {
                secao.classList.add("show-section");
            }
        });
    }

    // Executa uma vez ao carregar para mostrar a seção "Início" imediatamente
    checarVisibilidade();

    // Executa a função toda vez que o usuário usar o scroll do mouse
    window.addEventListener("scroll", checarVisibilidade);
});
