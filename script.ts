// interface createStore {
//     state: string;
// }
// interface action {
//     type: string;
//     name?: string;
// }
// interface arrayTodo {
//     name: string,
//     id: number,
//     complete: boolean
// }

function createStore<T>(reducer: (state: T, action: { type: string; payload?: Partial<T> }) => T, initialState: T) {
    let state = initialState;
    let subscribing;
    function dispatch(action: {
        type: string;
        payload?: Partial<T>
    }) {
        reducer(state, action);
    }
    return {
        getState: () => state,
        dispatch(action) {
            state = reducer(state, action);
            subscribing()
            return action;
        },
        subscribe(subscrib) {
            subscribing = subscrib;
        }
    }
}

const store = createStore(counterLogic, 0);
const root = document.querySelector('#root') as any | null;

store.subscribe(() => root.innerHTML = store.getState())

function counterLogic(state, action) {
    switch (action.type) {
        case 'addOne':
            return state = state + 1;
        case 'minOne':
            return state = state - 1;
        default:
            return state;
    }
}

const buttonPlus = document.querySelector('.plus') as HTMLButtonElement | null;
const buttonMinus = document.querySelector('.minus') as HTMLButtonElement | null;

buttonPlus?.addEventListener('click', () => {
    store.dispatch({
        type: 'addOne'
    })
})

buttonMinus?.addEventListener('click', () => {
    store.dispatch({
        type: 'minOne'
    })
})

function todoLogic(state, action) {
    switch (action.type) {
        case 'pushName':
            return state = [...state, action.name];
        default:
            return state;
    }
}

const storePush = createStore(todoLogic, []);
storePush.subscribe(() => console.log(storePush.getState()))

storePush.dispatch({
    type: 'pushName',
    name: 'Alex'
})
storePush.dispatch({
    type: 'pushName',
    name: 'Andrew',
})
storePush.dispatch({
    type: 'pushName',
    name: 'Jeje'
})
storePush.dispatch({
    type: 'pushName',
    name: 'Comput'
})