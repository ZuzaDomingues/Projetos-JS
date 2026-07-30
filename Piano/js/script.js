const C4 = new Audio('../piano-mp3/C4.mp3');
const D4 = new Audio('../piano-mp3/D4.mp3');
const E4 = new Audio('../piano-mp3/E4.mp3');
const F4 = new Audio('../piano-mp3/F4.mp3');
const G4 = new Audio('../piano-mp3/G4.mp3');
const A4 = new Audio('../piano-mp3/A4.mp3');
const B4 = new Audio('../piano-mp3/B4.mp3');

const Db4 = new Audio('../piano-mp3/Db4.mp3');
const Eb4 = new Audio('../piano-mp3/Eb4.mp3');
const Gb4 = new Audio('../Js6/piano-mp3/Gb4.mp3');
const Ab4 = new Audio('../piano-mp3/Ab4.mp3');
const Bb4 = new Audio('../piano-mp3/Bb4.mp3');

function tocar(som) {
    som.currentTime = 0;
    som.play();
    console.log('Tocando!');
}

document.querySelector('[data-som="1"]').addEventListener('click', () => tocar(C4));
document.querySelector('[data-som="2"]').addEventListener('click', () => tocar(Db4));
document.querySelector('[data-som="3"]').addEventListener('click', () => tocar(D4));
document.querySelector('[data-som="4"]').addEventListener('click', () => tocar(Eb4));
document.querySelector('[data-som="5"]').addEventListener('click', () => tocar(E4));
document.querySelector('[data-som="6"]').addEventListener('click', () => tocar(F4));
document.querySelector('[data-som="7"]').addEventListener('click', () => tocar(Gb4));
document.querySelector('[data-som="8"]').addEventListener('click', () => tocar(G4));
document.querySelector('[data-som="9"]').addEventListener('click', () => tocar(Ab4));
document.querySelector('[data-som="0"]').addEventListener('click', () => tocar(A4));
document.querySelector('[data-som="-"]').addEventListener('click', () => tocar(Bb4));
document.querySelector('[data-som="="]').addEventListener('click', () => tocar(B4));

document.addEventListener('keydown', function(evento) {
    const tecla = evento.key;
    
    const teclas = {
        '1': C4,
        '2': Db4,
        '3': D4,
        '4': Eb4,
        '5': E4,
        '6': F4,
        '7': Gb4,
        '8': G4,
        '9': Ab4,
        '0': A4,
        '-': Bb4,
        '=': B4
    };
    
    const som = teclas[tecla];
    if (som) {
        tocar(som);

        const botao = document.querySelector(`[data-som="${tecla}"]`);
        if (botao) {
            botao.classList.add('ativo');
            setTimeout(() => botao.classList.remove('ativo'), 200);
        }
    }
});

document.getElementById('btn-ajuda').addEventListener('click', function() {
    alert('🎹 Como tocar piano:\n\n' +
          '🖱️ Clique nas teclas com o mouse\n' +
          '⌨️ Ou use o teclado:\n' +
          '   1 = Dó (C4)\n' +
          '   2 = Dó# (Db4)\n' +
          '   3 = Ré (D4)\n' +
          '   4 = Ré# (Eb4)\n' +
          '   5 = Mi (E4)\n' +
          '   6 = Fá (F4)\n' +
          '   7 = Fá# (Gb4)\n' +
          '   8 = Sol (G4)\n' +
          '   9 = Sol# (Ab4)\n' +
          '   0 = Lá (A4)\n' +
          '   - = Lá# (Bb4)\n' +
          '   = = Si (B4)\n\n' +
          '🎵 Divirta-se!');
});

console.log('🎹 Piano carregado! (Oitava 4)');
console.log('⌨️ Teclas: 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, -, =');