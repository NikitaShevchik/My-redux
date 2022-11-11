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




// export function cretStor(reducer, initialState) {
//     let state = initialState;
//     return {
//         getState: () => state,
//         addOne: () => state = state + 1,
//         delOne: () => state = state - 1,
//         clearState: () => state = 0
//     }
// }





// const store = cretStor('red', 0)

// console.log(store.getState())
// console.log(store.addOne())
// console.log(store.getState())
// console.log(store.addOne())
// console.log(store.getState())








// export function createStore(reducer, initialState) {
//     let state = initialState;
//     return {
//         getState: () => state,
//         dispatch: { reducer: () => console.log(reducer) }
//     }
// }

// export function createStoree(reducer, initialState) {
//     let state = initialState;
//     return {
//         getState: () => state,
//         dispatch(action) {
//             reducer === 'sayHello' && console.log('Hello world yo ' + action),
//                 reducer === 'sayHow' && csonsole.log('How How How ' + action)
//         }
//     }
// }

// export function createStoreNext(reducer, initialState) {
//     let state = initialState
//     return {
//         dispatch: action => { state = reducer(state, action) },
//         getState: () => state,
//     }
// }




const init = {
    value: 0
}

function callback() {
    console.log('+')
}

export function createStoreCounter(reducer, initialState) {
    let state = initialState;
    let subscribers = [];
    return {
        getState: () => state,
        dispatch(action) {
            state = reducer(state, action);
            subscribers.forEach(b => console.log(b))
            // return action
        },
        subscribe(renderCallback) {
            subscribers.push(renderCallback());
        },
        getSubscribers: () => subscribers,
    }
}


const store = createStoreCounter(reducerCounter, init)

function reducerCounter(state, action) {
    switch (action.type) {
        case 'inc':
            return state = { ...state, value: state.value + 1 };
        case 'dec':
            return state = { ...state, value: state.value - 1 };
        default:
            return state;
    }
}

const render = () => {
    const root = document.getElementById('root');
    const state = store.getState()
    root.innerHTML = state.value;
}
console.log(store.getState())
store.subscribe(render)
store.dispatch({
    type: 'inc'
})
// console.log(store.getState())
// store.dispatch({
//     type: 'inc'
// })
// render()
// console.log(store.getState().value)
// console.log(store.getSubscribers())


// store.dispatch({
//     type: 'inc'
// })
// store.dispatch({
//     type: 'inc'
// })
// render()
// render()
// store.dispatch({
//     type: 'dec'
// })


// store.dispatch({
//     type: 'addOne'
// })
// store.subscribe(render);
// console.log(store.getState())
// store.dispatch({
//     type: 'addOne'
// })
// console.log(store.getState())
// store.dispatch({
//     type: 'addOne'
// })
// console.log(store.getState())



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






// export function switchCounter(reducer, initialState) {
//     let state = initialState;
//     let subscribing = () => { };
//     return {
//         getState: () => state,
//         dispath(action) {
//             state = reducer(state, action);
//             subscribing()
//             return action;
//         },
//         subscribe(subscrib) {
//             subscribing = subscrib;
//         }
//     }
// }