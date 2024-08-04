import {instance} from "./axiosInstance";
import {GetTasksResponse, Tasks, TasksResponse, UpdateTaskModel} from "../types/task.types";

export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string){
        return instance.post<TasksResponse<{item: Tasks}>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModel){
        return instance.put<TasksResponse<{item: Tasks}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)

    },
    deleteTask(todolistId: string, taskId: string,){
        return instance.delete<TasksResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}


