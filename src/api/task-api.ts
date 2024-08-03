import {instance} from "./axiosInstance";
import {GetTasksResponse, Tasks, TasksResponse, UpdateTaskModel} from "../types/task.types";

export const taskAPI = {
    getTasks(todolistId: string) {
        const promise = instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
        return promise
    },
    createTask(todolistId: string, title: string){
        const promise = instance.post<TasksResponse<{item: Tasks}>>(`/todo-lists/${todolistId}/tasks`, {title})
        return promise
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModel){
        const promise = instance.put<TasksResponse<{item: Tasks}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
        return promise
    },
    deleteTask(todolistId: string, taskId: string,){
        const promise = instance.delete<TasksResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    }
}


