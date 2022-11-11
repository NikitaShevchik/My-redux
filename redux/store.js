// export function cretStor(reducer, initialState) {
//     let state = initialState;
//     return {
//         if(reducer = 'GET_STATE') {
//             return state;
//         },
//         if(reducer = 'ADD_ONE') {
//             state = state + 1;
//         },
//         if(reducer = 'DEL_ONE') {
//             state = state - 1;
//         },
//         if(reducer = 'CLEAR_STATE') {
//             state = 0;
//         }

//         // {
//         //     reducer: 'GET_STATE',
//         //     getState: () => state
//         // },
//         // {
//         //     reducer: 'ADD_ONE',
//         //     addOne: () => state = state + 1,
//         // },
//         // {
//         //     reducer: 'DEL_ONE',
//         //     delOne: () => state = state - 1,
//         // },
//         // {
//         //     reducer: 'CLEAR_STATE',
//         //     clearState: () => state = 0
//         // }


//         // getState: () => state,
//         // addOne: () => state = state + 1,
//         // delOne: () => state = state - 1,
//         // clearState: () => state = 0
//     }
// }

// let store = cretStor('ADD_ONE', 0)

// console.log(store.('GET_STATE'))

export function cretStor(reducer, initialState) {
    let state = initialState;
    return {
        getState: () => state,
        addOne: () => state = state + 1,
        delOne: () => state = state - 1,
        clearState: () => state = 0
    }
}

const store = cretStor('red', 0)

// console.log(store.getState())
// console.log(store.addOne())
// console.log(store.getState())
// console.log(store.addOne())
// console.log(store.getState())


export function createStore(reducer, initialState) {
    let state = initialState;
    return {
        getState: () => state,
        dispatch: { reducer: () => console.log(reducer) }
    }
}

export function createStoree(reducer, initialState) {
    let state = initialState;
    return {
        getState: () => state,
        dispatch(action) {
            reducer === 'sayHello' && console.log('Hello world yo ' + action),
                reducer === 'sayHow' && csonsole.log('How How How ' + action)
        }
    }
}

export function createStoreNext(reducer, initialState) {
    let state = initialState
    return {
        dispatch: action => { state = reducer(state, action) },
        getState: () => state,
    }
}

export function createStoreCounter(reducer, initialState) {
    let state = initialState;
    let subscribing = () => { };
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

// export function switchCounter(reducer, initialState) {
//     let state = initialState;
//     let subscribing;
//     return {
//         getState: () => state,
//         dispath(action) {
//             state = reducer(state, action);
//             subscribing()
//             return action;
//         },
//         subscribe(subscrib) {
//             subscribing = subscrib();
//         }
//     }
// }

export function switchCounter(reducer, initialState) {
    let state = initialState;
    let subscribing = () => { };
    return {
        getState: () => state,
        dispath(action) {
            state = reducer(state, action);
            subscribing()
            return action;
        },
        subscribe(subscrib) {
            subscribing = subscrib;
        }
    }
}