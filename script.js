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

// document.getElementById('list').innerHTML = items.join('<br>' + '<button class = ".linethrough" onclick="removeItem(this)">X</button>');
// for(let i = 0; i < items.length; i++){
// document.getElementById('list').innerHTML += items[i] + '<br>' + '<button onclick="removeItem(' + i + ')">Remove</button>' + '<br>';
// }

// document.createElement('button');
// document.getElementById('list').innerHTML = items.join('<br>');

//create encapsulated task
// attach to dom when ready
// learn more about innerHTML not used often, problems with it
// javascript object, id, ischecked
