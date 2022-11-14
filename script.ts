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
//         // dispatch(action) {
//         //     state = reducer(state, action);
//         //     subscribing()
//         //     return action;
//         // },
//         subscribe(subscrib) {
//             subscribing = subscrib;
//         }
//     }
// }


// interface User {
//     name: string;
//     age: number;
// }

// interface State<T> {
//     loading: boolean;
//     error: Error | null;
//     data: T
// }

// interface Message {
//     id: number;
//     text: string;
// }

// type UserState = State<User>;
// type MessageState = State<Message>

// const messageState: MessageState = {
//     loading: true,
//     error: null,
//     data: {
//         id: 1,
//         text: 'Text'
//     }
// }



// function identity<T>(arg: T): T { // функция работает с типом Т и принимает тип Т
//     return arg
// }
// const s: string = 'Hello';
// const n: number = 555;
// const user: User = {
//     name: 'Max',
//     age: 22
// }

// const r1 = identity(s)
// const r2 = identity(n)
// const r3 = identity(user)




// interface CreateStore {
//     reducer: any;
//     initialState: string;
// }


// function createStore2(reducer, initialState) {
//     let state = initialState;
//     return {
//         getState: () => state,
//         dispatch(action) {
//             state = reducer(state, action);
//             return action;
//         }
//     }
// }


// enum UserActionTypes {
//     FETCH_USERS = 'FETCH_USERS',
//     FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
//     FETCH_USERS_ERROR = 'FETCH_USERS_ERROR'
// }

// interface FetchUserAction {
//     type: UserActionTypes.FETCH_USERS;
// }
// interface FetchUserSuccessAction {
//     type: UserActionTypes.FETCH_USERS_SUCCESS;
//     payload: any[]

// }
// interface FetchUserErrorAction {
//     type: UserActionTypes.FETCH_USERS_ERROR;
//     payload: string
// }

// interface UserState {
//     users: any[];
//     loading: boolean;
//     error: null | string;
// }

// const initialState: UserState = {
//     users: [],
//     loading: false,
//     error: null
// }

// type UserAction = FetchUserAction | FetchUserErrorAction | FetchUserSuccessAction

// export const userReducer = (state = initialState, action: UserAction): UserState | undefined => {
//     switch (action.type) {
//         case UserActionTypes.FETCH_USERS:
//             return { users: [], loading: true, error: null }
//         case UserActionTypes.FETCH_USERS_SUCCESS:
//             return { users: action.payload, loading: false, error: null }
//         case UserActionTypes.FETCH_USERS_ERROR:
//             return { users: [], loading: false, error: action.payload }
//         default:
//             return state
//     }
// }


// const store = createStore(counterLogic, 0);
// const root = document.querySelector('#root') as any | null;

// store.subscribe(() => root.innerHTML = store.getState())

// function counterLogic(state, action) {
//     switch (action.type) {
//         case 'addOne':
//             return state = state + 1;
//         case 'minOne':
//             return state = state - 1;
//         default:
//             return state;
//     }
// }

// const buttonPlus = document.querySelector('.plus') as HTMLButtonElement | null;
// const buttonMinus = document.querySelector('.minus') as HTMLButtonElement | null;

// buttonPlus?.addEventListener('click', () => {
//     store.dispatch({
//         type: 'addOne'
//     })
// })

// buttonMinus?.addEventListener('click', () => {
//     store.dispatch({
//         type: 'minOne'
//     })
// })

// function todoLogic(state, action) {
//     switch (action.type) {
//         case 'pushName':
//             return state = [...state, action.name];
//         default:
//             return state;
//     }
// }

// const storePush = createStore(todoLogic, []);
// storePush.subscribe(() => console.log(storePush.getState()))

// storePush.dispatch({
//     type: 'pushName',
//     name: 'Alex'
// })
// storePush.dispatch({
//     type: 'pushName',
//     name: 'Andrew',
// })
// storePush.dispatch({
//     type: 'pushName',
//     name: 'Jeje'
// })
// storePush.dispatch({
//     type: 'pushName',
//     name: 'Comput'
// })

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



// interface UserAction {
//     type: string;
//     payload?: any;
// }



// const store = createStore(counterLogic, 0);
// const root = document.querySelector('#root') as any | null;

// store.subscribe(() => root.innerHTML = store.getState())

// function counterLogic(state, action) {
//     switch (action.type) {
//         case 'addOne':
//             return state = state + 1;
//         case 'minOne':
//             return state = state - 1;
//         default:
//             return state;
//     }
// }

// const buttonPlus = document.querySelector('.plus') as HTMLButtonElement | null;
// const buttonMinus = document.querySelector('.minus') as HTMLButtonElement | null;

// buttonPlus?.addEventListener('click', () => {
//     store.dispatch({
//         type: 'addOne'
//     })
// })

// buttonMinus?.addEventListener('click', () => {
//     store.dispatch({
//         type: 'minOne'
//     })
// })

// function todoLogic(state, action) {
//     switch (action.type) {
//         case 'pushName':
//             return state = [...state, action.name];
//         default:
//             return state;
//     }
// }

// const storePush = createStore(todoLogic, []);
// storePush.subscribe(() => console.log(storePush.getState()))

// storePush.dispatch({
//     type: 'pushName',
//     name: 'Alex'
// })
// storePush.dispatch({
//     type: 'pushName',
//     name: 'Andrew',
// })
// storePush.dispatch({
//     type: 'pushName',
//     name: 'Jeje'
// })
// storePush.dispatch({
//     type: 'pushName',
//     name: 'Comput'
// })