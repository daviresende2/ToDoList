Dar F5 no To Do List, mostrar todo o funcionamento.
Ir explicar logo o JavaScript:
toda vez que a gente abrir uma janela desse coisa, ele vai chamar essa função.
a funcao adicionar tarefa vai dar uma variavel nova tarefa, pegando esse valor do HTML (task input) adicionando tarefa e a nova tarefa se tiver diferente do vazio, ele vai criar novo item na lista já salvando no Local Storage.
O edittask aqui, teremos o texto da tarefa, ele vai pegar a tarefa e atribuir o texto que ta dentro da tarefa 


add task:

function addTask() {
    // Obtém o texto da tarefa do elemento de entrada de texto com id 'taskInput' e remove espaços em branco em excesso
    let taskText = taskInput.value.trim();
    // Se o texto da tarefa estiver vazio, retorna imediatamente, não adicionando uma tarefa vazia
    if (taskText === '') return;

    // Cria um objeto representando a nova tarefa com o texto da tarefa e o estado de conclusão inicialmente definido como falso
    let task = {
        text: taskText,
        completed: false
    };

    // Cria um novo elemento de lista <li> para representar a nova tarefa
    let li = document.createElement('li');
    // Define o conteúdo HTML do elemento <li> com um input de texto exibindo o texto da tarefa, e botões "Editar" e "Excluir"
    li.innerHTML = `
        <input type="text" value="${task.text}" readonly>
        <button class="edit" onclick="editTask(this)">Editar</button>
        <button class="delete" onclick="deleteTask(this)">Excluir</button>
    `;
    // Adiciona o novo elemento <li> à lista de tarefas com id 'taskList'
    taskList.appendChild(li);

    // Obtém as tarefas salvas do armazenamento local ou inicializa um array vazio se não houver tarefas salvas
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Adiciona a nova tarefa ao array de tarefas salvas
    savedTasks.push(task);
    // Atualiza as tarefas salvas no armazenamento local, incluindo a nova tarefa
    localStorage.setItem('tasks', JSON.stringify(savedTasks));

    // Limpa o campo de entrada de texto para prepará-lo para a próxima entrada
    taskInput.value = '';
}


edit task^:

  function editTask(button) {
    // Obtém o elemento pai do botão, que é a <li> que contém a tarefa
    let li = button.parentElement;
    // Obtém o input dentro da <li> que contém o texto da tarefa
    let input = li.querySelector('input[type="text"]');
    // Obtém as tarefas salvas do armazenamento local ou inicializa um array vazio se não houver tarefas salvas
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Verifica se o input está marcado como somente leitura
    if (input.hasAttribute('readonly')) {
        // Se estiver somente leitura, remove o atributo somente leitura para permitir edição
        input.removeAttribute('readonly');
        // Muda o texto do botão para "Salvar"
        button.textContent = 'Salvar';
        // Marca todas as tarefas com o mesmo texto da tarefa editada como concluídas no array de tarefas salvas
        savedTasks.forEach(task => {
            if (task.text === input.value) {
                task.completed = true;
            }
        });
        // Adiciona a classe 'completed' à <li> para indicar que a tarefa foi concluída
        li.classList.add('completed');
    } else {
        // Se não estiver somente leitura, adiciona o atributo somente leitura para impedir edição
        input.setAttribute('readonly', 'true');
        // Muda o texto do botão para "Editar"
        button.textContent = 'Editar';
        // Marca todas as tarefas com o mesmo texto da tarefa editada como não concluídas no array de tarefas salvas
        savedTasks.forEach(task => {
            if (task.text === input.value) {
                task.completed = false;
            }
        });
        // Remove a classe 'completed' da <li> para indicar que a tarefa não foi concluída
        li.classList.remove('completed');
    }

    // Atualiza as tarefas salvas no armazenamento local
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
}


deletetask:

function deleteTask(button) {
    // Obtém o elemento pai do botão, que é a <li> que contém a tarefa
    let li = button.parentElement;
    // Obtém o input dentro da <li> que contém o texto da tarefa
    let input = li.querySelector('input[type="text"]');
    // Obtém as tarefas salvas do armazenamento local ou inicializa um array vazio se não houver tarefas salvas
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Filtra o array de tarefas salvas para remover a tarefa com o mesmo texto da tarefa que está sendo excluída
    savedTasks = savedTasks.filter(task => task.text !== input.value);
    // Atualiza as tarefas salvas no armazenamento local, excluindo a tarefa que está sendo removida
    localStorage.setItem('tasks', JSON.stringify(savedTasks));

    // Remove o elemento <li> do DOM, ou seja, remove a tarefa da lista na interface do usuário
    li.remove();
}


