const form = document.getElementById('form');
const input = document.getElementById('input');
const ul = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos){
    todos.forEach((todo) => {
        addTodo(todo);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    addTodo();
});

function addTodo(todo){
    let todoText = input.value;

    if (todo){
        todoText = todo.text;
    }

    // if(todoText) {
    //     const toDoElement = document.createElement('li');
    //     if (todo)
    // }
}