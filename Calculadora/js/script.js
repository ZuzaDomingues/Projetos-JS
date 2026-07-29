// ============================================
// 📦 ELEMENTOS
// ============================================
const display = document.querySelector('#display');

// ============================================
// 📝 FUNÇÕES
// ============================================

function inserirDisplay(valor) {
    // Previne operadores consecutivos
    const ultimo = display.value.slice(-1);
    if ('+-*/'.includes(ultimo) && '+-*/'.includes(valor)) {
        return; // Não permite dois operadores seguidos
    }
    display.value += valor;
}

function limpar() {
    display.value = '';
}

function voltar() {
    display.value = display.value.slice(0, -1);
}

function calcular() {
    try {
        // Substitui para exibição bonita
        const expressao = display.value;
        
        // Verifica se termina com operador
        if ('+-*/'.includes(expressao.slice(-1))) {
            display.value = 'Erro';
            setTimeout(() => limpar(), 1000);
            return;
        }

        // Avalia de forma segura
        const resultado = Function(`"use strict"; return (${expressao})`)();
        
        // Verifica se é infinito
        if (!isFinite(resultado)) {
            display.value = 'Infinito';
            setTimeout(() => limpar(), 1000);
            return;
        }

        // Mostra resultado (sem .toFixed forçado)
        display.value = Number.isInteger(resultado) ? resultado : resultado.toFixed(4).replace(/\.?0+$/, '');
        
    } catch {
        display.value = 'Erro';
        setTimeout(() => limpar(), 1000);
    }
}