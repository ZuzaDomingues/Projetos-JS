
const kick = new Audio('../audio/kick.wav');
const snare = new Audio('../audio/snare.wav');
const clap = new Audio('../audio/clap.wav');
const hihat = new Audio('../audio/hihat.wav');
const openhat = new Audio('../audio/openhat.wav');
const ride = new Audio('../audio/ride.wav');
const tink = new Audio('../audio/tink.wav');
const tom = new Audio('../audio/tom.wav');
const boom = new Audio('../audio/boom.wav');

function tocar(som) {
    som.currentTime = 0;
    som.play();
    console.log('Tocando!');
}

document.querySelector('[data-som="kick"]').addEventListener('click', () => tocar(kick));
document.querySelector('[data-som="snare"]').addEventListener('click', () => tocar(snare));
document.querySelector('[data-som="clap"]').addEventListener('click', () => tocar(clap));
document.querySelector('[data-som="hihat"]').addEventListener('click', () => tocar(hihat));
document.querySelector('[data-som="openhat"]').addEventListener('click', () => tocar(openhat));
document.querySelector('[data-som="ride"]').addEventListener('click', () => tocar(ride));
document.querySelector('[data-som="tink"]').addEventListener('click', () => tocar(tink));
document.querySelector('[data-som="tom"]').addEventListener('click', () => tocar(tom));
document.querySelector('[data-som="boom"]').addEventListener('click', () => tocar(boom));

document.getElementById('btn-ajuda').addEventListener('click', function() {
    alert(' Como tocar bateria:\n\n' +
          ' Clique nas teclas com o mouse\n' +
          ' Ou use o teclado:\n' +
          ' K = Kick\n' +
          ' S = Snare\n' +
          ' C = Clap\n' +
          ' H = Hi-Hat\n' +
          ' O = Open Hat\n' +
          ' R = Ride\n' +
          ' T = Tink\n' +
          ' M = Tom\n' +
          ' B = Boom');
});

document.addEventListener('keydown', function(evento) {
    const tecla = evento.key;
    if (tecla === 'k') {
        tocar(kick);
    } else if (tecla === 's') {
        tocar(snare);
    } else if (tecla === 'c') {
        tocar(clap);
    } else if (tecla === 'h') {
        tocar(hihat);
    } else if (tecla === 'o') {
        tocar(openhat);
    } else if (tecla === 'r') {
        tocar(ride);
    } else if (tecla === 't') {
        tocar(tink);
    } else if (tecla === 'm') {
        tocar(tom);
    } else if (tecla === 'b') {
        tocar(boom);
    }
});