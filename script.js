document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addButton = document.getElementById("add-button");
    const taskList = document.getElementById("task-list");

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function updateLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function displayTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span>${task}</span>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            `;
            taskList.appendChild(listItem);

            // Attach event listeners to Edit and Delete buttons
            const editButton = listItem.querySelector(".edit-button");
            const deleteButton = listItem.querySelector(".delete-button");

            editButton.addEventListener("click", () => editTask(index));
            deleteButton.addEventListener("click", () => deleteTask(index));
        });
    }

    function addTask() {
        const newTask = taskInput.value.trim();
        if (newTask !== "") {
            tasks.push(newTask);
            updateLocalStorage();
            displayTasks();
            taskInput.value = "";
        }
    }

    function editTask(index) {
        const updatedTask = prompt("Edit task:", tasks[index]);
        if (updatedTask !== null) {
            tasks[index] = updatedTask;
            updateLocalStorage();
            displayTasks();
        }
    }

    function deleteTask(index) {
        const confirmDelete = confirm("Are you sure you want to delete this task?");
        if (confirmDelete) {
            tasks.splice(index, 1);
            updateLocalStorage();
            displayTasks();
        }
    }

    addButton.addEventListener("click", addTask);

    displayTasks();
});
