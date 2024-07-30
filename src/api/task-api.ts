import {instance} from "./axiosInstance";
import {GetTasksResponse, Tasks, TasksResponse} from "../types/task.types";

export const taskAPI = {
    getTasks(todolistId: string) {
        const promise = instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
        return promise
    },
    createTask(todolistId: string, title: string){
        const promise = instance.post<TasksResponse<{item: Tasks}>>(`/todo-lists/${todolistId}/tasks`, {title})
        return promise
    },
    updateTaskTitle(todolistId: string, taskId: string, title: string){
        const promise = instance.put<TasksResponse<{item: Tasks}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
        return promise
    },
    deleteTask(todolistId: string, taskId: string,){
        const promise = instance.delete<TasksResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    }
}


