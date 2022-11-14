export function createStore<T>(reducer: (state: T, action: { type: string; payload?: Partial<T> }) => T, initialState: T) {
    let state = initialState;
    let subscribing;
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
        subscribe(subscrib) {
            subscribing = subscrib;
        }
    }
}
