// ============================================
// 📚 BANCO DE FRASES
// ============================================
const frases = [
    "A única maneira de fazer um grande trabalho é amar o que você faz.",
    "A vida é o que acontece enquanto você está ocupado fazendo outros planos.",
    "O futuro pertence àqueles que acreditam na beleza de seus sonhos.",
    "Não importa o quão devagar você vá, desde que não pare.",
    "No final, não são os anos em sua vida que contam. É a vida em seus anos.",
    "O propósito de nossas vidas é ser feliz.",
    "Viva intensamente ou morra tentando.",
    "Você só vive uma vez, mas se fizer direito, uma vez é suficiente.",
    "Muitos dos fracassos da vida são pessoas que não perceberam o quão perto estavam do sucesso quando desistiram.",
    "Se você quer viver uma vida feliz, amarre-a a um objetivo, não a pessoas ou coisas.",
    "Acredite que você pode e já está no meio do caminho.",
    "O sucesso não é final, o fracasso não é fatal: o que importa é a coragem de continuar."
];

// ============================================
// 🎯 ESTADO DA APLICAÇÃO
// ============================================
let frasesUsadas = new Set();
const elementoFrase = document.getElementById('quote');
const botaoGerar = document.getElementById('btn-gerar');
const botaoResetar = document.getElementById('btn-resetar');
const contadorElemento = document.getElementById('contador');

// ============================================
// 📊 FUNÇÕES PRINCIPAIS
// ============================================

/**
 * Gera uma frase aleatória não repetida
 * @function gerarFrase
 */
function gerarFrase() {
    // Verifica se todas as frases foram usadas
    if (frasesUsadas.size >= frases.length) {
        alert('🎉 Você já viu todas as frases! Clique em "Resetar" para começar novamente.');
        botaoGerar.disabled = true;
        return;
    }

    // Encontra uma frase não usada
    let indiceAleatorio;
    let tentativas = 0;
    const maxTentativas = 100; // Evita loop infinito
    
    while (tentativas < maxTentativas) {
        indiceAleatorio = Math.floor(Math.random() * frases.length);
        if (!frasesUsadas.has(indiceAleatorio)) {
            break;
        }
        tentativas++;
    }

    // Se não encontrou frase disponível (segurança extra)
    if (tentativas >= maxTentativas) {
        alert('Erro: não foi possível encontrar uma frase. Clique em "Resetar".');
        return;
    }

    // Marca a frase como usada e exibe
    frasesUsadas.add(indiceAleatorio);
    const frase = frases[indiceAleatorio];
    elementoFrase.textContent = frase;
    
    // Atualiza o contador
    atualizarContador();
    
    // Aplica animação
    elementoFrase.style.animation = 'none';
    setTimeout(() => {
        elementoFrase.style.animation = 'fadeInUp 0.5s ease';
    }, 10);

    // Desabilita o botão se todas as frases foram usadas
    if (frasesUsadas.size >= frases.length) {
        botaoGerar.disabled = true;
    }
}

/**
 * Reseta o estado, permitindo ver todas as frases novamente
 * @function resetarFrases
 */
function resetarFrases() {
    frasesUsadas.clear();
    elementoFrase.textContent = 'Clique no botão para gerar uma frase';
    botaoGerar.disabled = false;
    atualizarContador();

    elementoFrase.style.animation = 'none';
    setTimeout(() => {
        elementoFrase.style.animation = 'fadeInUp 0.5s ease';
    }, 10);
}

/**
 * Atualiza o contador de frases restantes
 * @function atualizarContador
 */
function atualizarContador() {
    const restantes = frases.length - frasesUsadas.size;
    contadorElemento.textContent = `📖 Frases restantes: ${restantes} de ${frases.length}`;
    
    // Muda a cor quando está acabando
    if (restantes <= 3 && restantes > 0) {
        contadorElemento.style.color = '#ffd93d';
    } else if (restantes === 0) {
        contadorElemento.style.color = '#ff6b6b';
    } else {
        contadorElemento.style.color = 'rgba(255, 255, 255, 0.8)';
    }
}

// ============================================
// ⌨️ EVENTOS ADICIONAIS
// ============================================

// Gerar frase com a tecla Espaço
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Space') {
        e.preventDefault();
        if (!botaoGerar.disabled) {
            gerarFrase();
        }
    }
});

// Gerar frase ao clicar no botão (já está no HTML com onclick)

// ============================================
// 🚀 INICIALIZAÇÃO
// ============================================
atualizarContador();