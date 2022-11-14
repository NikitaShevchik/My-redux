export function createStore<T>(reducer: (state: T, action: { type: string; payload?: Partial<T> }) => T, initialState: T) {
    let state = initialState;
    return {
        getState: () => state,
        dispatch(action: {
            type: string;
            payload?: Partial<T>
        }) {
            state = reducer(state, action);
            return action;
        },
    }
}
