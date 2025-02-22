document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `
        <span class="task-text">${taskInput.value}</span>
        <button class="complete" onclick="completeTask(this)">✔️ Done</button>
        <button class="edit" onclick="editTask(this)">✏️ Edit</button>
        <button class="delete" onclick="removeTask(this)">❌</button>
    `;

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}

function removeTask(task) {
    task.parentElement.remove();
    saveTasks();
}

function editTask(task) {
    let taskText = task.parentElement.querySelector(".task-text");
    let newTask = prompt("Edit task:", taskText.innerText);
    
    if (newTask !== null && newTask.trim() !== "") {
        taskText.innerText = newTask;
        saveTasks();
    }
}

function completeTask(task) {
    let completedList = document.getElementById("completedTasks");
    let taskItem = task.parentElement;

    taskItem.querySelector(".complete").remove();
    completedList.appendChild(taskItem);
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li .task-text").forEach(task => {
        tasks.push(task.innerText);
    });

    let completedTasks = [];
    document.querySelectorAll("#completedTasks li .task-text").forEach(task => {
        completedTasks.push(task.innerText);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

    let taskList = document.getElementById("taskList");
    let completedList = document.getElementById("completedTasks");

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text">${task}</span>
            <button class="complete" onclick="completeTask(this)">✔️ Done</button>
            <button class="edit" onclick="editTask(this)">✏️ Edit</button>
            <button class="delete" onclick="removeTask(this)">❌</button>
        `;
        taskList.appendChild(li);
    });

    completedTasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text">${task}</span>
            <button class="delete" onclick="removeTask(this)">❌</button>
        `;
        completedList.appendChild(li);
    });
}
