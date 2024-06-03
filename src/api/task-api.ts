import {instance} from "./axiosInstance";

export const taskAPI = {
    getTasks(todolistId: string) {
        const promise = instance.get(`/todo-lists/${todolistId}/tasks`)
        return promise
    },
    createTask(todolistId: string, title: string){
        const promise = instance.post(`/todo-lists/${todolistId}/tasks`, {title})
        return promise
    },
    updateTaskTitle(todolistId: string, taskId: string, title: string){
        const promise = instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
        return promise
    },
    deleteTask(todolistId: string, taskId: string,){
        const promise = instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    }
}


