document.addEventListener('DOMContentLoaded', () => {
    const inputTarefa = document.getElementById('input-tarefa');
    const botaoAdicionar = document.getElementById('botao-adicionar');
    const listaTarefas = document.getElementById('lista-tarefas');
    const barraProgresso = document.getElementById('progresso');
    const numerosProgresso = document.getElementById('numeros');

    const atualizarProgresso = () => {
        const totalTarefas = listaTarefas.children.length;
        const tarefasConcluidas = listaTarefas.querySelectorAll('.checkbox:checked').length;
        
        const porcentagem = totalTarefas > 0 ? (tarefasConcluidas / totalTarefas) * 100 : 0;
        barraProgresso.style.width = `${porcentagem}%`;
        numerosProgresso.textContent = `${tarefasConcluidas} / ${totalTarefas}`;
    };

    const salvarTarefasNoLocalStorage = () => {
        const tarefas = Array.from(listaTarefas.querySelectorAll('li')).map(li => ({
            texto: li.querySelector('span').textContent,
            concluida: li.querySelector('.checkbox').checked
        }));
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    };

    const carregarTarefasDoLocalStorage = () => {
        const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
        tarefasSalvas.forEach(({texto, concluida}) => adicionarTarefa(texto, concluida));
        atualizarProgresso();
    };

    const adicionarTarefa = (texto, concluida = false) => {
        const textoDaTarefa = texto || inputTarefa.value.trim();
        if(!textoDaTarefa) {
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${concluida ? 'checked' : ''}/>
        <span>${textoDaTarefa}</span>
        <div class="botoes-tarefa">
            <button class="botao-editar"><i class="fa-solid fa-pen"></i></button>
            <button class="botao-deletar"><i class="fa-solid fa-trash"></i></button> 
        </div>   
        `;

        const checkbox = li.querySelector('.checkbox');
        const botaoEditar = li.querySelector('.botao-editar');
        const botaoDeletar = li.querySelector('.botao-deletar');

        if(concluida){
            li.classList.add('concluida');
            botaoEditar.disabled = true;
            botaoEditar.style.opacity = '0.5';
            botaoEditar.style.pointerEvents = 'none';
        }

        checkbox.addEventListener('change', () => {
            const estaMarcado = checkbox.checked;
            li.classList.toggle('concluida', estaMarcado);
            botaoEditar.disabled = estaMarcado;
            botaoEditar.style.opacity = estaMarcado ? '0.5' : '1';
            botaoEditar.style.pointerEvents = estaMarcado ? 'none' : 'auto';
            atualizarProgresso();
            salvarTarefasNoLocalStorage();
        });

        botaoEditar.addEventListener('click', () => {
            if(!checkbox.checked){
                inputTarefa.value = li.querySelector('span').textContent;
                li.remove();
                atualizarProgresso();
                salvarTarefasNoLocalStorage();
            }
        });

        botaoDeletar.addEventListener('click', () => {
            li.remove();
            atualizarProgresso();
            salvarTarefasNoLocalStorage();
        });

        listaTarefas.appendChild(li);
        inputTarefa.value = '';
        atualizarProgresso();
        salvarTarefasNoLocalStorage();
    };

    botaoAdicionar.addEventListener('click', (e) => {
        e.preventDefault();
        adicionarTarefa();
    });

    inputTarefa.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            adicionarTarefa();
        }
    });

    carregarTarefasDoLocalStorage();
});