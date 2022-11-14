export function createStore<T>(reducer: (state: T, action: { type: string; payload?: Partial<T> }) => T, initialState: T) {
    let state = initialState;
    let subscribing: () => void;
    return {
        getState: () => state,
        dispatch(action: {
            type: string;
            payload?: Partial<T>
        }) {
            state = reducer(state, action);
            subscribing();
            return action;
        },
        subscribe(subscrib: () => void) {
            subscribing = subscrib;
        }
    }
}

// const mamba = (state, action) => {
//     switch (action.type) {
//         case 'first':
//             return state = state + 10;
//         case 'second':
//             return state = state + 100;
//         default:
//             return state
//     }
// }

// const store = createStore(mamba, 1000);

// store.dispatch({
//     type: 'first'
// })
// console.log(store.getState())