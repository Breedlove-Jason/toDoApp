'use strict';

const items = [];
document.getElementById('form').addEventListener('submit', addItem);

function addItem(e) {
    e.preventDefault();
    const input = document.getElementById('new-todo');
    const task = {
        text: input.value,
        checked: false,
        id: Date.now()
    };

    items.push(task);
    console.log('items', items);
    renderRow();

    function renderRow() {
        const list = document.getElementById('toDo');

        list.innerHTML = '';

        for (let i = 0; i < items.length; i++) {
            const text = items[i].text;
            const li = document.createElement('LI');
            li.className = 'todo-item';
            li.addEventListener('click', function (e) {
                toggleTask(items[i].id)
            });
            li.id = items[i].id;
            li.textContent = text;
            if (items[i].checked === true) {
                li.style.setProperty("text-decoration", "line-through");
                // li.textDecoration.style('line-through');
            }

            list.appendChild(li);

            const span = document.createElement('SPAN');
            span.className = 'delete-todo';

            li.appendChild(span);
            const deleteButton = document.createElement('BUTTON');
            deleteButton.className = 'deleteButton';
            deleteButton.textContent = 'X';
            span.appendChild(deleteButton);

            deleteButton.addEventListener('click', function (e) {
                e.preventDefault();
                deleteItem(items[i].id);
            });
        }
    }
    function deleteItem(id) {
        // check to see if checked === true && the id passed in equals the id you want to delete
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === id && items[i].checked === true) {
                // items.splice(i, 1);
                items.splice(items.indexOf(items[i]), 1);
                }
        }
        renderRow();
    }
    function toggleTask(id) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === id) {
                items[i].checked = !items[i].checked;
            }
        }
        renderRow();
    }

}

