'use strict';

let items = [];

function addItem(){
    let input = document.getElementById('input');
    items.push(input.value);
    items.value = "";
    for(let i = 0; i < items.length; i++){
        document.getElementById('list').innerHTML += items[i] + '<br>';
        document.createElement('button');
    }

    // document.getElementById('list').innerHTML = items.join('<br>');
}
function removeItems(){
}
//create encapsulated task
// attach to dom when ready
// learn more about innerHTML not used often, problems with it
// javascript object, id, ischecked