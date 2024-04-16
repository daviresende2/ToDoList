document.addEventListener('DOMContentLoaded', function() {
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    savedTasks.forEach(task => {
        let li = document.createElement('li');
        
        li.innerHTML = `
            <input type="text" value="${task.text}" ${task.completed ? 'readonly' : ''}>
            <button class="edit" onclick="editTask(this)">${task.completed ? 'Visualizar' : 'Editar'}</button>
            <button class="delete" onclick="deleteTask(this)">Excluir</button>
        `;
        
        if (task.completed) {
            li.classList.add('completed');
        }
        
        taskList.appendChild(li);
    });
});

function addTask() {
    let taskText = taskInput.value.trim();
    if (taskText === '') return;

    let task = {
        text: taskText,
        completed: false
    };

    let li = document.createElement('li');
    li.innerHTML = `
        <input type="text" value="${task.text}" readonly>
        <button class="edit" onclick="editTask(this)">Editar</button>
        <button class="delete" onclick="deleteTask(this)">Excluir</button>
    `;
    taskList.appendChild(li);
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));

    taskInput.value = '';
}

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

    localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

function deleteTask(button) {
    let li = button.parentElement;
    let input = li.querySelector('input[type="text"]');
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    savedTasks = savedTasks.filter(task => task.text !== input.value);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));

    li.remove();
}
