const questions = [
    {
        question: "Qual é o maior animal do mundo?",
        answers: [
            { id: 1, text: "Tubarão", correct: false },
            { id: 2, text: "Baleia", correct: true },
            { id: 3, text: "Elefante", correct: false },
            { id: 4, text: "Papagaio", correct: false }
        ]
    },
    {
        question: "Quantos planetas existem no Sistema Solar?",
        answers: [
            { id: 1, text: "7", correct: false },
            { id: 2, text: "8", correct: true },
            { id: 3, text: "9", correct: false },
            { id: 4, text: "10", correct: false }
        ]
    },
    {
        question: "Qual é a capital do Brasil?",
        answers: [
            { id: 1, text: "Rio de Janeiro", correct: false },
            { id: 2, text: "São Paulo", correct: false },
            { id: 3, text: "Brasília", correct: true },
            { id: 4, text: "Salvador", correct: false }
        ]
    },
    {
        question: "Qual é o resultado de 7 x 8?",
        answers: [
            { id: 1, text: "48", correct: false },
            { id: 2, text: "54", correct: false },
            { id: 3, text: "56", correct: true },
            { id: 4, text: "64", correct: false }
        ]
    },
    {
        question: "Qual é o maior planeta do Sistema Solar?",
        answers: [
            { id: 1, text: "Saturno", correct: false },
            { id: 2, text: "Júpiter", correct: true },
            { id: 3, text: "Terra", correct: false },
            { id: 4, text: "Marte", correct: false }
        ]
    },
    {
        question: "Quem escreveu a peça 'Romeu e Julieta'?",
        answers: [
            { id: 1, text: "Machado de Assis", correct: false },
            { id: 2, text: "Charles Dickens", correct: false },
            { id: 3, text: "William Shakespeare", correct: true },
            { id: 4, text: "José de Alencar", correct: false }
        ]
    },
    {
        question: "Qual é o animal mais rápido do mundo?",
        answers: [
            { id: 1, text: "Leão", correct: false },
            { id: 2, text: "Guepardo", correct: true },
            { id: 3, text: "Cavalo", correct: false },
            { id: 4, text: "Coelho", correct: false }
        ]
    },
    {
        question: "Quantos lados tem um hexágono?",
        answers: [
            { id: 1, text: "5", correct: false },
            { id: 2, text: "6", correct: true },
            { id: 3, text: "7", correct: false },
            { id: 4, text: "8", correct: false }
        ]
    },
    {
        question: "Qual é o maior oceano do mundo?",
        answers: [
            { id: 1, text: "Oceano Atlântico", correct: false },
            { id: 2, text: "Oceano Índico", correct: false },
            { id: 3, text: "Oceano Ártico", correct: false },
            { id: 4, text: "Oceano Pacífico", correct: true }
        ]
    },
    {
        question: "Em que ano o homem pisou na Lua pela primeira vez?",
        answers: [
            { id: 1, text: "1969", correct: true },
            { id: 2, text: "1959", correct: false },
            { id: 3, text: "1975", correct: false },
            { id: 4, text: "1980", correct: false }
        ]
    }
]

const pergunta = document.getElementById("question");
const botaoResposta = document.getElementById("answer-buttons");
const botaoProximo = document.getElementById("next-btn");

let perguntaAtual = 0;
let pontuacao = 0;

function iniciarQuiz() {
    perguntaAtual = 0;
    pontuacao = 0;
    botaoProximo.innerHTML = "Próxima";
    mostraQuestao();
}

function reiniciar(){
    botaoProximo.style.display = "none";
    while (botaoResposta.firstChild){
        botaoResposta.removeChild(botaoResposta.firstChild);
    }
}

function mostraQuestao(){
    reiniciar();

    let atual = questions[perguntaAtual];
    let numeroAtual = perguntaAtual + 1;
    pergunta.innerHTML = numeroAtual + ". " + atual.question;

    atual.answers.forEach(answer => {
        const button = document.createElement("button");        
        button.innerHTML = answer.text;
        button.dataset.id = answer.id;
        button.classList.add("btn");
        button.addEventListener("click", selecionaResposta);
        botaoResposta.appendChild(button);
    });
}

function selecionaResposta(e){
    answer = questions[perguntaAtual].answers;
    const perguntaCorreta = answer.find((a) => a.correct);

    const botaoselecionado = e.target;
    const correto = botaoselecionado.dataset.id == perguntaCorreta.id;
    if (correto) {
        botaoselecionado.classList.add("correct")
        pontuacao++;
    } else {
        botaoselecionado.classList.add("incorrect");
    }
    Array.from(botaoResposta.children).forEach((button) =>{
        button.disabled = true;
    })
    botaoProximo.style.display = "block";
}

function mostraPontuacao() {
    reiniciar();

    if (pontuacao === questions.length) {
        pergunta.innerHTML = `PERFEITO! Você acertou ${pontuacao} de ${questions.length}!!!`;
    } else if (pontuacao >= 7) {
        pergunta.innerHTML = `Muito bem! Você acertou ${pontuacao} de ${questions.length}!!!`;
    } else if (pontuacao >= 5) {
        pergunta.innerHTML = `Bom! Você acertou ${pontuacao} de ${questions.length}!!!`;
    } else if (pontuacao >= 3) {
        pergunta.innerHTML = `Dá pra melhorar! Você acertou ${pontuacao} de ${questions.length}`;
    } else {
        pergunta.innerHTML = `Continue treinando! Você acertou ${pontuacao} de ${questions.length}`;
    }

    botaoProximo.innerHTML = "Jogar Novamente";
    botaoProximo.style.display = "block";
}

function proximaPergunta() {
    perguntaAtual++;
    if(perguntaAtual < questions.length){
        mostraQuestao();
    } else{
        mostraPontuacao();
    }
}

botaoProximo.addEventListener("click", () => {
    if(perguntaAtual < questions.length) {
        proximaPergunta();
    } else {
        iniciarQuiz();
    }
})

iniciarQuiz();