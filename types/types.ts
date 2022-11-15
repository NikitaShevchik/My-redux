export interface ITodo {
    text?: string,
    done?: boolean,
    id?: string
}

export interface TodoInterface {};
export type TodoType = {};
export interface IAction<T> {
    type: string,
    payload?: Partial<T>
}