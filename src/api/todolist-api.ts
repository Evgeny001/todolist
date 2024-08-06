import {Todolists} from "../types/todolist.types";
import {instance} from "./axiosInstance";
import {Response} from "../types/response.type";
import {AxiosResponse} from "axios";

export const todolistAPI = {
    getTodolists() {
        return instance.get<Todolists[]>('todo-lists')
    },
    createTodolist(title: string) {
         return instance.post<Response<{item: Todolists}>, AxiosResponse<Response<{ item: Todolists }>>,{ title: string }>('todo-lists', {title})
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<Response, AxiosResponse<Response>, {title: string}>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId: string){
        return instance.delete<Response>(`todo-lists/${todolistId}`)
    }
}
