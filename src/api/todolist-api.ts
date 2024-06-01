import axios from "axios";
const settings = {
    withCredentials: true,
    headers: { 'API-KEY': 'e5cb4230-28c5-474d-85e1-4e3f997cae50'}
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e5cb4230-28c5-474d-85e1-4e3f997cae50'
    },
})
export const todolistAPI = {
    getTodolists() {
        const promise = instance.get('todo-lists', settings)
    return promise
    },
    createTodolist(title: string) {
        const promise = instance.post('todo-lists', {title}, settings)
        return promise
    },
    updateTodolistTitle(todolistId: string, title: string) {
        const promise = instance.put(`todo-lists/${todolistId}`,
            {title}, settings)
        return promise
    },
    deleteTodolist(todolistId: string){
        const promise = instance.delete(`todo-lists/${todolistId}`, settings)
    return promise
    }
}
