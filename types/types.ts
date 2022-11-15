export interface ITodo {
    text?: string,
    done?: boolean,
    id?: string
}
export interface IAction<T> {
    type: string,
    payload?: Partial<T>
}