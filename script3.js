    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        // Cria um novo item de lista (li) com input de texto e botões
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="text" value="${taskText}" readonly>
            <button class="edit" onclick="editTask(this)">Editar</button>
            <button class="delete" onclick="deleteTask(this)">Excluir</button>
        `;
        taskList.appendChild(li); // Adiciona o novo item à lista
        taskInput.value = ''; // Limpa o input de texto após adicionar
    }

    // Função para editar uma tarefa
    function editTask(button) {
        const li = button.parentElement;
        const input = li.querySelector('input[type="text"]');
        if (input.hasAttribute('readonly')) {
            input.removeAttribute('readonly');
            button.textContent = 'Salvar';
        } else {
            input.setAttribute('readonly', 'true');
            button.textContent = 'Editar';
        }
    }

    // Função para excluir uma tarefa
    function deleteTask(button) {
        const li = button.parentElement;
        li.remove(); // Remove o item da lista
    }
