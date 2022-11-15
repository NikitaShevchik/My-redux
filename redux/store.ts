import { ITodo } from "../types/types";



export function createStore<T>(reducer: (state: T, action: { type: string; payload?: Partial<ITodo> }) => T, initialState: T) {
    let state = initialState;
    let subscribing: () => void;
    return {
        getState: () => state,
        dispatch(action: {
            type: string;
            payload?: Partial<ITodo>
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