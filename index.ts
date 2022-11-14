import { createStore } from "./redux/store"

interface Todo {
    text?: string;
    done?: boolean;
    id: number;
}
const todoState: Todo[] = [
    {
        text: 'Do homework',
        done: true,
        id: 0
    },
    {
        text: 'Make coffee',
        done: false,
        id: 1
    },
    {
        text: 'Make popop',
        done: true,
        id: 2
    }
]


// console.log(todoState.find(todo => todo.id === 0).done)

enum todoActionTypes {
    ADD_TODO = 'ADD_TODO',
    REMOVE_TODO = 'REMOVE_TODO',
    SET_TODO = 'SET_TODO'
}


function todoReducer(state: [], action: { type: string, payload?: Todo[] | number }) {
    switch (action.type) {
        case 'ADD_TODO':
            state.push(action.payload);
            return state
        case 'REMOVE_TODO':
            return state = state.filter(todo => action.payload !== todo.id)
        case 'SET_TODO':

            const newState = state.map((todo) => (
                todo.id === action.payload
                    ? { ...todo, done: !todo.done }
                    : todo
            ));


            // state[action.payload].done = !state[action.payload].done;
            return newState
        default:
            return action
    }
}

const store = createStore(todoReducer, todoState)
// console.log(todoState)
// console.log(store.getState())
// store.dispatch({
//     type: 'ADD_TODO',
//     payload: {
//         text: 'Nikita',
//         done: false,
//         id: 3
//     }
// })
const todo = document.querySelector('.todo');

// console.log(todo?.children)
function updateTodo() {
    let storage = store.getState();
    todo?.innerHTML = '';
    storage.map(y => todo?.innerHTML += `<div class="todo__element" id="${y.id}"><p id="${y.id}" data-done="${y.done}" class="todo__item">${y.text}</p><i id="${y.id}" class='bx bx-trash'></i></div>`)
    const todosText = document.querySelectorAll('.todo__item');
    for (let k of todosText) {
        k.addEventListener('click', () => {
            store.dispatch({
                type: 'SET_TODO',
                payload: Number(k.id)
            })
        })
    }
    let todoDelete = document.querySelectorAll('.bx-trash');
    for (let k of todoDelete) {
        k.addEventListener('click', (e) => {
            store.dispatch({
                type: 'REMOVE_TODO',
                payload: Number(k.id)
            })
        })
    }
}
updateTodo()
store.subscribe(updateTodo)

// store.dispatch({
//     type: 'REMOVE_TODO',
//     payload: 0
// })
let storage = store.getState();
// console.log(storage.find(todo => todo.id === 0).done = false )
console.log(store.getState())
// store.dispatch({
//     type: 'ADD_TODO',
//     payload: {
//         text: 'Nikita',
//         done: false,
//         id: 3
//     }
// })
// store.dispatch({
//     type: 'ADD_TODO',
//     payload: {
//         text: 'Nibakita',
//         done: false,
//         id: 4
//     }
// })
// store.dispatch({
//     type: 'ADD_TODO',
//     payload: {
//         text: 'Nissta',
//         done: false,
//         id: 5
//     }
// })

const buttonAddTodo = document.querySelector('.add');
buttonAddTodo?.addEventListener('click', () => {
    let input = document.querySelector('.input') as HTMLInputElement;
    if (input?.value !== '') {
        store.dispatch({
            type: "ADD_TODO",
            payload: {
                text: input?.value,
                done: false,
                id: store.getState().length
            }
        })
        input.value = "";
    }
})



// console.log(store.getState())
// store.dispatch({
//     type: 'SET_TODO',
//     payload: '0'
// })

// store.dispatch({
//     type: 'REMOVE_TODO',
//     payload: {
//         text: 'Nikita',
//         done: false,
//         id: 3
//     }
// })



// store.dispatch({
//     type: 'ADD_TODO',
//     payload: {
//         text: 'Aleryt',
//         done: false,
//         id: 3
//     }
// })





























// function createStore<T>(reducer: (state: T, action: { type: string; payload?: Partial<T> }) => T, initialState: T) {
//     let state = initialState;
//     return {
//         getState: () => state,
//         dispatch(action: {
//             type: string;
//             payload?: Partial<T>
//         }) {
//             state = reducer(state, action);
//             return action;
//         },
//     }
// }

// const initialState = 10;
// enum actionsType {
//     ADD_ONE = 'ADD_ONE',
//     MIN_ONE = 'MIN_ONE'
// }
// function reducerStore(state, action) {
//     switch (action.type) {
//         case actionsType.ADD_ONE:
//             return state = state + 1;
//         case actionsType.MIN_ONE:
//             return state = state - 1;
//         default:
//             return state
//     }
// }

// const store = createStore(reducerStore, initialState);


// console.log(store.getState())
// console.log(store.dispatch({
//     type: 'ADD_ONE'
// }))
// console.log(store.dispatch({
//     type: 'ADD_ONE'
// }))
// console.log(store.dispatch({
//     type: 'ADD_ONE'
// }))
// console.log(store.getState())

//----------------------------------------------------------------------------------------------------------------------------------

// type FunctionalComponent<T extends object = object> = (props: T & { children: any }) => any;

// const component: FunctionalComponent<{ name: string, age: number }> = (
//     {
//         children
//     }
// ) => {

// }


// function createStore<T>(reducer: (state: T, action: { type: string, payload?: Partial<T> }) => T, initialState: T) {
//     let state = initialState;
//     // let subscribing;
//     // function dispatch(action) {
//     //     reducer(state, action);
//     //     return action;
//     // }
//     return {
//         getState: () => state,
//         dispatch(action) {
//             state = reducer(state, action);
//             // subscribing()
//             return action;
//         },
//         // subscribe(subscrib) {
//         //     subscribing = subscrib;
//         // }
//     }
// }




// function createStore<T>(reducer: (state: T, action: { type: string; payload?: Partial<T> }) => T, initialState: T) {
//     let state = initialState;
//     let subscribing;
//     function dispatch(action: {
//         type: string;
//         payload?: Partial<T>
//     }) {
//         reducer(state, action);
//     }
//     return {
//         getState: () => state,
//         dispatch(action) {
//             state = reducer(state, action);
//             subscribing()
//             return action;
//         },
//         subscribe(subscrib) {
//             subscribing = subscrib;
//         }
//     }
// }


// interface Action<T> {
//     type: string;
//     payload?: Partial<T>
// }

// interface Reducer<T> {
//     state: T;
//     action: Action<T>;
// }

// interface CreateStoreInterface<T> {
//     reducer: Reducer<T>;
//     initialState: T;

// }
