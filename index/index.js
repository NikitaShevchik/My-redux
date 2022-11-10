// import { cretStor } from "../script";

import { cretStor } from "../redux/store.js"

let store = cretStor('reducer', 0)

console.log(store);

setTimeout(() =>
    console.log(store.getState()), 1000
)

const counter = document.querySelector('.display')
const addButton = document.querySelector('.add')
const delButton = document.querySelector('.del')
const clearButton = document.querySelector('.clear')

function actualState(element, state) {
    element.innerHTML = store.getState();
}

actualState(counter, store.getState());

addButton.addEventListener('click', () => {
    store.addOne()
    actualState(counter, store.getState())
})

delButton.addEventListener('click', () => {
    store.delOne()
    actualState(counter, store.getState())
})

clearButton.addEventListener('click', () => {
    store.clearState()
    actualState(counter, store.getState())
})
