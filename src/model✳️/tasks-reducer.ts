import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
        taskId: string
        todoListId: string
    }
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    payload: {
        todoListId: string
        title: string
        id: string
    }
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK'
    payload: {
        todoListId: string,
        taskId: string,
        isDone: boolean
    }
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TITLE'
    payload: {
        todoListId: string,
        taskId: string,
        title: string
    }
}
type ActionType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | RemoveTodolistActionType
    | AddTodolistActionType
const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
   switch (action.type) {
       case 'REMOVE-TASK' : {
           return {...state, [action.payload.todoListId]: state[action.payload.todoListId].filter(t=>t.id !==action.payload.taskId)}
       }
       case 'ADD-TASK' : {
           const newTask: TaskType = {
               id: action.payload.id, isDone: true, title: action.payload.title
           }
           return {...state, [action.payload.todoListId]: [newTask,...state[action.payload.todoListId]]}
       }
       case 'CHANGE-TASK': {
           return {...state, [action.payload.todoListId]: state[action.payload.todoListId].map(t=>t.id === action.payload.taskId? {...t, isDone: action.payload.isDone} : t)}
       }
       case 'CHANGE-TITLE': {
           return {...state, [action.payload.todoListId]: state[action.payload.todoListId].map(t=>t.id === action.payload.taskId? {...t, title: action.payload.title} : t)}
       }
       case 'REMOVE-TODOLIST': {
           delete state[action.payload.id]
           return state
       }
       case 'ADD-TODOLIST': {
           return {...state, [action.payload.id]: []};
       }
       default : {
           return state
       }
   }
}
export const removeTaskAC = (todoListId: string, taskId: string): RemoveTaskActionType => {
    return {payload: {todoListId, taskId}, type: "REMOVE-TASK"} as const
}
export const addTaskAC = (todoListId: string, title: string): AddTaskActionType => {
    return {payload: {todoListId, title, id: v1()}, type: 'ADD-TASK'} as const
}
export const changeTaskStatusAC = (todoListId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {payload: {todoListId, taskId, isDone}, type: 'CHANGE-TASK'} as const
}
export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {payload: {todoListId, taskId, title}, type: 'CHANGE-TITLE'}
}
