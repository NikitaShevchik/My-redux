// import { cretStor } from "../script";

import { createStore, createStoreCounter, createStoree, cretStor, switchCounter } from "../redux/store.js"

let store = cretStor('reducer', 0)

let store2 = createStore('Test message', '')

store2.dispatch.reducer()

let store3 = createStoree('sayHello', '')
store3.dispatch('reducer')

// console.log(store);

// setTimeout(() =>
//     console.log(store.getState()), 1000
// )

const counter = document.querySelector('.display')
const addButton = document.querySelector('.add')
const delButton = document.querySelector('.del')
const clearButton = document.querySelector('.clear')
const consoleButton = document.querySelector('.console')

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

consoleButton.addEventListener('click', () => {
    console.log(store.getState())
})





const switcherCounter = switchCounter(counterSwitcher, true)
const counterStore = createStoreCounter(counterLogic, 0)

function counterLogic(state, action) {
    switch (action.type) {
        case 'addNumber':
            return state = state + action.number;
        case 'minNumber':
            return state = state - action.number;
        default:
            return state
    }
}

function counterSwitcher(state, action) {
    switch (action.type) {
        case 'switch':
            return state = !state;
        default:
            return state
    }
}


const addToState = document.querySelector('.addToState');
addToState.addEventListener('click', () => {
    addToState.classList.toggle('minusFromState')
    if (addToState.classList.contains('minusFromState')) {
        switcherCounter.dispath({
            type: 'switch'
        })
        addToState.innerHTML = ('Minus from state')
        addToState.style.color = 'red'
    } else {
        switcherCounter.dispath({
            type: 'switch'
        })
        addToState.innerHTML = ('Add to state')
        addToState.style.color = 'black'
    }
})

const addNumber = document.querySelectorAll('.addNumber')

// function displayCounter() {
//     document.querySelector('.displayStateCounter').innerHTML = counterStore.getState()
// }
// displayCounter()

for (let button of addNumber) {
    button.addEventListener('click', (e) => {
        if (switcherCounter.getState()) {
            counterStore.dispatch({
                type: 'addNumber',
                number: Number(e.target.innerHTML)
            })
        } else {
            counterStore.dispatch({
                type: 'minNumber',
                number: Number(e.target.innerHTML)
            })
        }
        // displayCounter()
        console.log(counterStore.getState())
    })
}

switcherCounter.subscribe(() => console.log('Switcher set to', switcherCounter.getState()))
counterStore.subscribe(() => document.querySelector('.displayStateCounter').innerHTML = counterStore.getState())

// addSix.map(button => {
//     button.addEventListener('click', (e) => {
//         counterStore.dispatch({
//             type: 'addOne',
//             number: Number(e.target.innerHTML)
//         })
//         displayCounter()
//         console.log(counterStore.getState())
//     })
// })

// console.log(counterStore.getState())

