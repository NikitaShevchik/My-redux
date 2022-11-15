import { createStore } from "./redux/store"
import { nanoid } from 'nanoid'
import { IAction, ITodo } from "./types/types"

function id() {
    return nanoid()
}

const todoState: ITodo[] = [
    {
        text: 'Do homework',
        done: false,
        id: id()
    },
    {
        text: 'Make coffee',
        done: false,
        id: id()
    },
    {
        text: 'Make popop',
        done: false,
        id: id()
    }
]

enum todoActionTypes {
    ADD_TODO = 'ADD_TODO',
    REMOVE_TODO = 'REMOVE_TODO',
    SET_TODO = 'SET_TODO'
}

function todoReducer(state: ITodo[], action: IAction<ITodo>) {
    switch (action.type) {
        case todoActionTypes.ADD_TODO:
            state.push({
                ...action.payload,
                done: false,
                id: id(),
            });
            return state
        case todoActionTypes.REMOVE_TODO:
            const filterState = state.filter(todo => action.payload?.id !== todo.id)
            return filterState
        case todoActionTypes.SET_TODO:
            const newState = state.map((todo) => (
                todo.id === action.payload?.id
                    ? { ...todo, done: !todo.done }
                    : todo
            ));
            return newState
        default:
            return state
    }
}

const store = createStore(todoReducer, todoState)

const todo = document.querySelector('.todo') as HTMLElement;

function updateTodo() {
    let storage = store.getState();
    todo.innerHTML = '';
    storage.map(item => todo.innerHTML += `<div class="todo__element" ><p id="${item.id}" data-done="${item.done}" class="todo__item">${item.text}</p><i id="${item.id}" class='bx bx-trash'></i></div>`)
    const todosText = document.querySelectorAll('.todo__item');
    for (let todosTextContent of todosText) {
        todosTextContent.addEventListener('click', () => {
            store.dispatch({
                type: todoActionTypes.SET_TODO,
                payload: {
                    id: todosTextContent.id
                }
            })
        })
    }
    let todoDelete = document.querySelectorAll('.bx-trash');
    for (let k of todoDelete) {
        k.addEventListener('click', () => {
            store.dispatch({
                type: todoActionTypes.REMOVE_TODO,
                payload: {
                    id: k.id
                }
            })
        })
    }
}
updateTodo()
store.subscribe(updateTodo)

const buttonAddTodo = document.querySelector('.add');
buttonAddTodo?.addEventListener('click', () => {
    let input = document.querySelector('.input') as HTMLInputElement;
    if (input.value !== '') {
        const value: string = String(input.value);
        store.dispatch({
            type: todoActionTypes.ADD_TODO,
            payload: {
                text: value
            }
        })
        input.value = "";
    }
})

const showState = document.querySelector('.state');
showState?.addEventListener('click', () => {
    const state = store.getState();
    console.log(state)
})


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
