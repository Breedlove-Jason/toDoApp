'use strict';

// let items = [];

function addItem() {
    let item = document.createElement('li');
    let input = document.getElementById('new-todo');
    item.innerHTML = input.value;
    // items.push(input.value);
    input.value = "";
    document.getElementById('toDo').appendChild(item);
    item.addEventListener('click', deleteItem);
    // let elem = document.getElementById('toDo').removeChild(item);
}

function deleteItem() {
    this.className = 'done';
    this.removeEventListener('click', deleteItem);
}

function undoneItems() {
    let undone = document.getElementsByClassName('undone');
    for (let i = 0; i < undone.length; i++) {
        undone[i].addEventListener('click', deleteItem);
    }
}

function clearItems() {
        let removeItem = document.getElementById('li');
        removeItem.addEventListener('click', removeItem);
}

function removeItem() {
    let elem = document.getElementById('toDo').removeChild(removeItem);
}
