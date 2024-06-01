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
export type CreateTodolistResponse = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {
        item: Todolists
    }
}

export type UpdateTodolistResponse = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {}
}

export type DeleteTodolistResponse = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {}
}


