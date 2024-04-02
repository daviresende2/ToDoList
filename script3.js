    function addTask() {
        let taskText = taskInput.value.trim();
        if (taskText === '') return;

        // Cria novo item de lista com input de texto e os botões
        let li = document.createElement('li');
        li.innerHTML = `
            <input type="text" value="${taskText}" readonly>
            <button class="edit" onclick="editTask(this)">Editar</button>
            <button class="delete" onclick="deleteTask(this)">Excluir</button>
        `;
        taskList.appendChild(li); // Adiciona o novo item a lista
        taskInput.value = ''; // Limpa o input de texto ao adicionar
    }

    // Função para editar uma tarefa
    function editTask(button) {
        let li = button.parentElement;
        let input = li.querySelector('input[type="text"]');
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
        let li = button.parentElement;
        li.remove(); // Remove o item da lista
    }
