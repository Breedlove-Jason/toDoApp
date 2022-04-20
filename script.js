'use strict';

// let items = [];

function addItem() {
    let input = document.getElementById('new-todo');
    let item = document.createElement('li');
    item.innerHTML = input.value;
    input.value = "";
    document.getElementById('toDo').appendChild(item);
    item.addEventListener('click', deleteItem);
    // document.getElementById('btn').removeChild(item);
    let remove = document.getElementById('btn');
    remove.addEventListener('click', function () {
        // console.log(remove, 'button is working');
        // item.remove();
        item.parentNode.removeChild(item);

    });
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
// function hideItem() {
//     this.className = 'hidden';
//     this.removeEventListener('click', hideItem);
    // let hide = document.getElementsByClassName('done');
    // for (let i = 0; i < hide.length; i++) {
    //     hide[i].addEventListener('click', hideItem);
    // }
// }

// function remove() {
//     let remove = document.getElementById('li');
//     document.getElementsByClassName('done').appendChild(remove);
//     remove.addEventListener('button', function(e) {
//     // let remove = document.getElementById('li').removeChild(item);
//     // remove.addEventListener('button', function(e) {
//     });
// }
