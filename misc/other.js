document.getElementById('add').onclick = function() {
    let toDo = document.getElementById('new-todo').value;
    let toDoList = document.getElementById('toDoList');
    let li = document.createElement('li');
    let checkbox = document.createElement('input');
    let label = document.createElement('label');
    let deleteButton = document.createElement('button');
    checkbox.type = 'checkbox';
    label.innerHTML = toDo;
    deleteButton.innerHTML = 'Delete';
    deleteButton.onclick = function () {
        toDoList.removeChild(li);
    };
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteButton);
    toDoList.appendChild(li);
};



// const buttonAdd = document.getElementById('add');
// const buttonHide = document.querySelector('.hide');
// let input = document.getElementById('input');
//
// function addItem() {
//     let li = document.createElement('li');
//     let text = document.createTextNode(input.value);
//     li.appendChild(text);
//     document.getElementById('list').appendChild(li);
//     input.value = '';
// }
//
// buttonAdd.addEventListener('click', () => {
// });
//
// // buttonHide.addEventListener('click', () => {
// //
// // })