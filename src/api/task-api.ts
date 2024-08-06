import {instance} from "./axiosInstance";
import {GetTasksResponse, Tasks, UpdateTaskModel} from "../types/task.types";
import {Response} from "../types/response.type";
import {AxiosResponse} from "axios";

export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string){
        return instance.post<Response<{item: Tasks}>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModel){
        return instance.put<Response<{item: Tasks}>, AxiosResponse<Response<{item: Tasks}>>, {title: string}>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)

    },
    deleteTask(todolistId: string, taskId: string,){
        return instance.delete<Response>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}


