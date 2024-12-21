function addTask() {
    const taskText = document.getElementById('task-text').value;
    const priorityLevel = document.getElementById('priority-level').value;
    const dueDate = document.getElementById('due-date').value;

    if (taskText === '') {
        alert('Tugas tidak boleh kosong!');
        return;
    }

    const task = {
        text: taskText,
        priority: priorityLevel,
        dueDate: dueDate,
        done: false,
    };

    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    saveTasksToLocalStorage(tasks);

    renderTasks();
    document.getElementById('task-text').value = '';
    document.getElementById('due-date').value = '';
}

function markAsDone(index) {
    let tasks = getTasksFromLocalStorage();
    tasks[index].done = !tasks[index].done;
    saveTasksToLocalStorage(tasks);
    renderTasks();
}

function deleteTask(index) {
    let tasks = getTasksFromLocalStorage();
    tasks.splice(index, 1);
    saveTasksToLocalStorage(tasks);
    renderTasks();
}

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const tasks = getTasksFromLocalStorage();
    const toDoList = document.getElementById('to-do-list');
    const doneList = document.getElementById('done-list');
    const overdueList = document.getElementById('overdue-list');

    toDoList.innerHTML = '';
    doneList.innerHTML = '';
    overdueList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task');
        if (task.done) taskItem.classList.add('done');

        const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.done;

        taskItem.innerHTML = `
            <span>${task.text} - ${task.priority} - Due: ${task.dueDate || 'No due date'}</span>
            <input type="checkbox" ${task.done ? 'checked' : ''} id="task-${index}">
            <label for="task-${index}" onclick="markAsDone(${index})"></label>
            <button onclick="deleteTask(${index})" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        `;

        if (isOverdue) {
            overdueList.appendChild(taskItem);
        } else if (task.done) {
            doneList.appendChild(taskItem);
        } else {
            toDoList.appendChild(taskItem);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    updateCurrentDate();
    renderTasks();
});

function updateCurrentDate() {
    const currentDateElement = document.getElementById('current-date');
    const now = new Date();
    currentDateElement.textContent = now.toLocaleDateString('id-ID', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}



