
// const initialState = [];

// class createStore {
//     constructor(state, action) {
//         this.state = initialState;
//         this.action = action;
//     }
//     addNew(action) {
//         this.state.push(action)
//     }
// }

// let store = new createStore()
// console.log(store.state)
// store.addNew('Test')
// console.log(store.state)
// store.addNew('Second test')
// console.log(store.state)



// Developer entry point is the “createStore” function. 
// createStore function should take a reducer and initial store as parameters.
// createStore should return store with next next methods:
// getState
// subscribe
// dispatch
// On dispatching actions all subscribers should update their states by calling callbacks that were passed inside the subscribe function.
// Task 2: Build a simple application of your choice with custom redux store usage.


const initialState = 1;

class createStore {
    constructor(state, action) {
        this.state = initialState;
        this.action = action;
    }
    addOne() {
        this.state = this.state + 1;
    }
    deleteOne() {
        this.state = this.state - 1;
    }
    showState() {
        return this.state
    }
}

// let store = new createStore()
// console.log(store.state)

// const counter = document.querySelector('.display')
// const addButton = document.querySelector('.add')
// const delButton = document.querySelector('.del')

// counter.innerHTML = store.state

// addButton.addEventListener('click', () => {
//     store.addOne()
//     console.log(store.state)
//     counter.innerHTML = store.state
// })

// console.log(store.showState())

// export function cretStor(reducer, initialState) {
//     let state = initialState;
//     return {
//         getState: () => state,
//         addOne: () => state = state + 1,
//         delOne: () => state = state - 1,
//         clearState: () => state = 0
//     }
// }

let store = cretStor('rediucer', 0)

// console.log(cretStor('red', 'its state').reducer())

// let counterState = store.getState();

// const counter = document.querySelector('.display')
// const addButton = document.querySelector('.add')
// const delButton = document.querySelector('.del')
// const clearButton = document.querySelector('.clear')

// function actualState(element, state) {
//     element.innerHTML = store.getState();
// }

// actualState(counter, store.getState());

// addButton.addEventListener('click', () => {
//     store.addOne()
//     actualState(counter, store.getState())
// })

// delButton.addEventListener('click', () => {
//     store.delOne()
//     actualState(counter, store.getState())
// })

// clearButton.addEventListener('click', () => {
//     store.clearState()
//     actualState(counter, store.getState())
// })

// while (store.getState() != 0) {
//     counter.innerHTML = counterState;
// }


