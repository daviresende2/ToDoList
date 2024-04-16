// Adiciona um event listener que é acionado quando o DOM está totalmente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Obtém as tarefas salvas do localStorage, ou cria um array vazio se não houver nada salvo
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Itera sobre cada tarefa salva
    savedTasks.forEach(task => {
        // Cria um novo elemento de lista (li)
        let li = document.createElement('li');
        
        // Define o conteúdo HTML do elemento li, incluindo um input de texto, botões de edição/exclusão
        li.innerHTML = `
            <input type="text" value="${task.text}" ${task.completed ? 'readonly' : ''}>
            <button class="edit" onclick="editTask(this)">${task.completed ? 'Visualizar' : 'Editar'}</button>
            <button class="delete" onclick="deleteTask(this)">Excluir</button>
        `;
        
        // Se a tarefa estiver concluída, adiciona a classe 'completed' ao elemento li
        if (task.completed) {
            li.classList.add('completed');
        }
        
        // Adiciona o elemento li à lista de tarefas na página
        taskList.appendChild(li);
    });
});

// Adicionar uma tarefa
function addTask() {
    let taskText = taskInput.value.trim();
    if (taskText === '') return;

    let task = {
        text: taskText,
        completed: false
    };

    // Cria um novo item de lista (li) com input de texto e botões
    let li = document.createElement('li');
    li.innerHTML = `
        <input type="text" value="${task.text}" readonly>
        <button class="edit" onclick="editTask(this)">Editar</button>
        <button class="delete" onclick="deleteTask(this)">Excluir</button>
    `;
    taskList.appendChild(li); // Adiciona o novo item à lista

    // Salva a nova tarefa
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));

    taskInput.value = ''; // Limpa o input de texto após adicionar
}

// Função para editar uma tarefa
function editTask(button) {
    let li = button.parentElement;
    let input = li.querySelector('input[type="text"]');
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (input.hasAttribute('readonly')) {
        input.removeAttribute('readonly');
        button.textContent = 'Salvar';
        savedTasks.forEach(task => {
            if (task.text === input.value) {
                task.completed = true;
            }
        });
        li.classList.add('completed');
    } else {
        input.setAttribute('readonly', 'true');
        button.textContent = 'Editar';
        savedTasks.forEach(task => {
            if (task.text === input.value) {
                task.completed = false;
            }
        });
        li.classList.remove('completed');
    }

    // Atualiza as tarefas salvas
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

// Função para excluir uma tarefa
function deleteTask(button) {
    let li = button.parentElement;
    let input = li.querySelector('input[type="text"]');
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    savedTasks = savedTasks.filter(task => task.text !== input.value);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));

    li.remove(); // Remove o item da lista
}

