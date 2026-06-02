let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
    const name = document.getElementById('task-name').value;
    const desc = document.getElementById('task-desc').value;
    
    if (name) {
        tasks.push({name, desc, completed: false, date: new Date().toLocaleDateString()});
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateTasks();
        document.getElementById('task-name').value = '';
        document.getElementById('task-desc').value = '';
    }
}

function toggleTask(i) {
    tasks[i].completed = !tasks[i].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTasks();
}

function deleteTask(i) {
    tasks.splice(i, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTasks();
}

function updateTasks() {
    const completed = tasks.filter(t => t.completed).length;
    document.getElementById('total-tasks').textContent = tasks.length;
    document.getElementById('completed-tasks').textContent = completed;
    
    document.getElementById('tasks').innerHTML = tasks.map((t, i) => `
        <div class="task-item" style="opacity: ${t.completed ? 0.6 : 1}">
            <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="toggleTask(${i})">
            <span><strong>${t.name}</strong> - ${t.desc}</span>
            <button onclick="deleteTask(${i})">Delete</button>
        </div>
    `).join('');
}

updateTasks();