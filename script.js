// script.js

const form = document.getElementById("form");
const input = document.getElementById("new-todo");
const dueDateInput = document.getElementById("due-date");
const priorityInput = document.getElementById("priority");
const ul = document.getElementById("toDo");
const searchInput = document.getElementById("search");
const filters = document.getElementById("filters");
const themeToggle = document.getElementById("theme-toggle");
const clearCompletedButton = document.createElement("button");

clearCompletedButton.id = "clear-completed";
clearCompletedButton.textContent = "Clear Completed";
clearCompletedButton.classList.add("btn", "btn-secondary", "ml-2");
filters.appendChild(clearCompletedButton);

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let isEditing = false;
let todoToEditId = null;

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Form Submission (Add/Edit Todo)
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = input.value.trim();
  const dueDate = dueDateInput.value;
  const priority = priorityInput.value;

  if (todoText) {
    const todo = {
      text: todoText,
      completed: false,
      id: Date.now(),
      dueDate: dueDate || "", // Fix: Allow empty due dates
      priority: priority || "low",
    };

    if (isEditing) {
      const index = todos.findIndex((t) => t.id === todoToEditId);
      todos[index] = { ...todo, id: todoToEditId };
      updateTodoDOM(todoToEditId, todos[index]);
      isEditing = false;
      todoToEditId = null;
    } else {
      todos.push(todo);
      addTodoToDOM(todo);
    }

    localStorage.setItem("todos", JSON.stringify(todos));
    form.reset();
  }
});

// Search and Filter Event Listeners
searchInput.addEventListener("input", filterTodos);
filters.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    document
      .querySelectorAll("#filters button")
      .forEach((button) => button.classList.remove("active"));
    e.target.classList.add("active");
    filterTodos(e.target.id);
  }
});

// Clear Completed Todos
clearCompletedButton.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.completed);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
});

// Drag-and-Drop Functionality
ul.addEventListener("dragstart", (e) => {
  if (e.target.tagName === "LI") {
    e.dataTransfer.setData("text/plain", e.target.id);
  }
});

ul.addEventListener("dragover", (e) => {
  e.preventDefault();
});

ul.addEventListener("drop", (e) => {
  e.preventDefault();
  const draggedItemId = e.dataTransfer.getData("text/plain");
  const draggedItem = document.getElementById(draggedItemId);
  const targetItem = e.target.closest("li");

  if (targetItem && draggedItem !== targetItem) {
    const draggedItemIndex = todos.findIndex(
      (todo) => todo.id === parseInt(draggedItemId),
    );
    const targetItemIndex = todos.findIndex(
      (todo) => todo.id === parseInt(targetItem.id),
    );

    // Swap items in the array
    [todos[draggedItemIndex], todos[targetItemIndex]] = [
      todos[targetItemIndex],
      todos[draggedItemIndex],
    ];

    // Update the DOM to reflect the new order
    ul.insertBefore(draggedItem, targetItem);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
});

// Function to add a new todo item to the DOM
function addTodoToDOM(todo) {
  const li = document.createElement("li");
  li.className = `list-group-item todo-item ${todo.completed ? "completed" : ""}`;
  li.id = todo.id;
  li.setAttribute("data-priority", todo.priority); // Add priority attribute
  li.setAttribute("draggable", "true"); // Make it draggable

  li.innerHTML = `
        <span>${todo.text}</span>
        <span>${todo.dueDate}</span>
        <span>${todo.priority}</span>
        <button class="btn btn-sm btn-warning editButton">Edit</button>
        <button class="btn btn-sm btn-danger deleteButton">X</button>
    `;

  li.querySelector(".editButton").addEventListener("click", (e) => {
    e.stopPropagation();
    editTodoItem(todo.id);
  });

  li.querySelector(".deleteButton").addEventListener("click", (e) => {
    e.stopPropagation();
    deleteTodoItem(todo.id);
  });

  li.addEventListener("click", () => toggleTodoCompletion(todo.id));
  ul.appendChild(li);
}

// Function to toggle the completion status of a todo
function toggleTodoCompletion(id) {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    localStorage.setItem("todos", JSON.stringify(todos));
    updateTodoDOM(id, todo);
  }
}

// Function to update the DOM when a todo is toggled or edited
function updateTodoDOM(id, updatedTodo) {
  const li = document.getElementById(id);
  if (li) {
    li.classList.toggle("completed", updatedTodo.completed);
    li.querySelector("span:nth-child(1)").textContent = updatedTodo.text;
    li.querySelector("span:nth-child(2)").textContent = updatedTodo.dueDate;
    li.querySelector("span:nth-child(3)").textContent = updatedTodo.priority;
  }
}

// Function to delete a todo item
function deleteTodoItem(id) {
  todos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos));
  document.getElementById(id).remove();
}

// Function to edit a todo item
function editTodoItem(id) {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    input.value = todo.text;
    dueDateInput.value = todo.dueDate;
    priorityInput.value = todo.priority;
    isEditing = true;
    todoToEditId = id;
  }
}

// Function to filter todos based on search input and filters
function filterTodos(filter = "all-tasks") {
  const searchText = searchInput.value.toLowerCase();
  ul.innerHTML = "";

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text.toLowerCase().includes(searchText);
    const matchesFilter =
      filter === "all-tasks" ||
      (filter === "completed-tasks" && todo.completed) ||
      (filter === "pending-tasks" && !todo.completed);
    return matchesSearch && matchesFilter;
  });

  filteredTodos.forEach((todo) => addTodoToDOM(todo));
}

// Function to render all todos
function renderTodos() {
  ul.innerHTML = "";
  todos.forEach((todo) => addTodoToDOM(todo));
}

// Initial render
renderTodos();
