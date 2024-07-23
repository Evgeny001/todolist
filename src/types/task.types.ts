import {TaskStatuses} from "./taskStatuses.types";
import {TaskPriorities} from "./taskPriorities.types";

export type Tasks = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type TasksState = {
    [key: string]: Tasks[]
}
export type GetTasksResponse = {
    totalCount: number
    error: string[]
    items: Tasks[]
}

export type TasksResponse<D = {}> = {
    data: D
    resultCode: number
    messages: string[]
}
