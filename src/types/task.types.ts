export type Tasks = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: null
    deadline: null
    id: string
    todoListId: string
    order: number
    addedDate: string
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
