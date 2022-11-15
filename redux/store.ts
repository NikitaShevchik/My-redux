import { ITodo } from "../types/types";



export function createStore<T, K>(reducer: (state: T , action: { type: string; payload?: K }) => T, initialState: T) {
    let state = initialState;
    let subscribing: () => void;
    return {
        getState: () => state,
        dispatch(action: {
            type: string;
            payload?:K
        }) {
            state = reducer(state, action);
            subscribing();
            return action;
        },
        subscribe(subscrib: VoidFunction) {
            subscribing = subscrib;
        }
    }
}