// ============================================
// VARIÁVEIS
// ============================================
const calcular = document.getElementById('calcular-btn');
const inputPeso = document.getElementById('peso');
const inputAltura = document.getElementById('altura');
const resultado = document.getElementById('imc-valor');
const classificacaoTexto = document.getElementById('classificacao-texto');
const iconeStatus = document.getElementById('icone-status');
const descricaoImc = document.getElementById('descricao-imc');
const resultadoContainer = document.getElementById('resultado-container');

// ============================================
// CLASSIFICAÇÕES
// ============================================
function obterClassificacao(imc) {
    if (imc < 18.5) {
        return {
            nome: 'Abaixo do peso',
            descricao: 'Você está abaixo do peso ideal. Procure um nutricionista.',
            icone: 'fa-solid fa-circle-exclamation',
            cor: '#4ecdc4',
            classe: 'classificacao-abaixo'
        };
    } else if (imc < 25) {
        return {
            nome: 'Peso normal',
            descricao: 'Parabéns! Você está no peso ideal. Mantenha hábitos saudáveis!',
            icone: 'fa-solid fa-circle-check',
            cor: '#2ecc71',
            classe: 'classificacao-normal'
        };
    } else if (imc < 30) {
        return {
            nome: 'Sobrepeso',
            descricao: 'Você está com sobrepeso. Considere uma reeducação alimentar.',
            icone: 'fa-solid fa-triangle-exclamation',
            cor: '#f1c40f',
            classe: 'classificacao-sobrepeso'
        };
    } else if (imc < 35) {
        return {
            nome: 'Obesidade Grau I',
            descricao: 'Obesidade moderada. Procure ajuda médica para orientação.',
            icone: 'fa-solid fa-circle-exclamation',
            cor: '#e67e22',
            classe: 'classificacao-obesidade1'
        };
    } else if (imc < 40) {
        return {
            nome: 'Obesidade Grau II',
            descricao: 'Obesidade severa. Busque acompanhamento médico urgente.',
            icone: 'fa-solid fa-circle-exclamation',
            cor: '#e74c3c',
            classe: 'classificacao-obesidade2'
        };
    } else {
        return {
            nome: 'Obesidade Grau III',
            descricao: 'Obesidade mórbida. Procure ajuda médica imediatamente.',
            icone: 'fa-solid fa-circle-exclamation',
            cor: '#c0392b',
            classe: 'classificacao-obesidade3'
        };
    }
}

// ============================================
// FUNÇÃO PRINCIPAL
// ============================================
function imc() {
    // Pega os valores e converte para número
    const peso = parseFloat(inputPeso.value);
    const altura = parseFloat(inputAltura.value);
    
    // Validação: campos vazios
    if (!peso || !altura) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    // Validação: peso válido
    if (peso <= 0 || peso > 500) {
        alert('Peso inválido! Digite um valor entre 1 e 500 kg.');
        inputPeso.focus();
        inputPeso.select();
        return;
    }
    
    // Validação: altura válida
    if (altura <= 0 || altura > 3) {
        alert('Altura inválida! Digite um valor entre 0.5 e 3 metros.');
        inputAltura.focus();
        inputAltura.select();
        return;
    }
    
    // Calcula o IMC
    const valorIMC = peso / (altura * altura);
    const imcFormatado = valorIMC.toFixed(1);
    
    // Obtém a classificação
    const classificacao = obterClassificacao(valorIMC);
    
    // Exibe o resultado
    resultado.textContent = imcFormatado;
    classificacaoTexto.textContent = classificacao.nome;
    classificacaoTexto.className = classificacao.classe;
    iconeStatus.className = classificacao.icone;
    iconeStatus.style.color = classificacao.cor;
    descricaoImc.textContent = classificacao.descricao;
    descricaoImc.style.color = classificacao.cor;
    
    // Mostra o container do resultado
    resultadoContainer.classList.remove('hidden');
}

// ============================================
// EVENTOS
// ============================================
calcular.addEventListener('click', imc);

// Tecla Enter nos inputs
inputPeso.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        inputAltura.focus();
    }
});

inputAltura.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        imc();
    }
});