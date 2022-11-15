import { nanoid as id } from "./node_modules/nanoid/index";
import { createStore } from "./redux/store"
import { IAction, ITodo } from "./types/types"

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
            return [
                ...state,
                {
                    ...action.payload,
                    done: false,
                    id: id(),
                }
            ]
        case todoActionTypes.REMOVE_TODO:
            return state.filter(todo => action.payload?.id !== todo.id)
        case todoActionTypes.SET_TODO:
            return state.map((todo) => (
                todo.id === action.payload?.id
                    ? { ...todo, done: !todo.done }
                    : todo
            ));
        default:
            return state
    }
}

const store = createStore<ITodo[], Partial<ITodo>>(todoReducer, todoState)

const todo = document.querySelector<HTMLDivElement>('.todo');

function updateTodo() {
    if (todo) {
        let storage = store.getState();
        todo.innerHTML = '';
        storage.map(item => todo.innerHTML += `<div class="todo__element" ><p id="${item.id}" data-done="${item.done}" class="todo__item">${item.text}</p><i id="${item.id}" class='bx bx-trash'></i></div>`)
        const todosText = document.querySelectorAll('.todo__item');
        for (let element of todosText) {
            element.addEventListener('click', () => {
                store.dispatch({
                    type: todoActionTypes.SET_TODO,
                    payload: {
                        id: element.id
                    }
                })
            })
        }
    }
    let todoDelete = document.querySelectorAll('.bx-trash') as NodeList;
    for (let element of todoDelete) {
        element.addEventListener('click', () => {
            store.dispatch({
                type: todoActionTypes.REMOVE_TODO,
                payload: {
                    id: element['id']
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
    if (input.value) {
        const value = input.value;
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


