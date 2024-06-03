import {
    TodolistResponse,
    Todolists
} from "../types/todolist.types";
import {instance} from "./axiosInstance";

export const todolistAPI = {
    getTodolists() {
        const promise = instance.get<Todolists[]>('todo-lists')
    return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<TodolistResponse<{item: Todolists}>>('todo-lists', {title})
        return promise
    },
    updateTodolistTitle(todolistId: string, title: string) {
        const promise = instance.put<TodolistResponse>(`todo-lists/${todolistId}`,
            {title})
        return promise
    },
    deleteTodolist(todolistId: string){
        const promise = instance.delete<TodolistResponse>(`todo-lists/${todolistId}`)
    return promise
    }
}
