'use strict';

let items = [];

function addItem(){
    let input = document.getElementById('input');
    items.push(input.value);
    items.value = "";
    for(let i = 0; i < items.length; i++){
        document.getElementById('list').innerHTML += items[i] + '<br>';
    }

    // document.getElementById('list').innerHTML = items.join('<br>');
}
function removeItems(){
}