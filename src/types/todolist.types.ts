export type Todolists = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
type FieldError = {
    error: string
    field: string
}
export type TodolistResponse<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: D
}


