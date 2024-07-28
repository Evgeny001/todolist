import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {Tasks, TasksState} from "../types/task.types";
import {TaskStatuses} from "../types/taskStatuses.types";
import {TaskPriorities} from "../types/taskPriorities.types";
import {Dispatch} from "redux";
import {taskAPI} from "../api/task-api";

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
        status: number
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
type SetTasksActionType = {
    type: 'SET-TASKS'
    payload: {
        tasks: Tasks[]
        todoListId: string
    }
}
type ActionType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType
const initialState: TasksState = {}
export const tasksReducer = (state: TasksState = initialState, action: ActionType): TasksState => {
   switch (action.type) {
       case 'REMOVE-TASK' : {
           return {...state, [action.payload.todoListId]: state[action.payload.todoListId].filter(t=>t.id !==action.payload.taskId)}
       }
       case 'ADD-TASK' : {
           const newTask: Tasks = {
               id: action.payload.id,
               status: TaskStatuses.New,
               title: action.payload.title,
               description: '',
               startDate: '',
               deadline: '',
               addedDate: '',
               order: 0,
               priority: TaskPriorities.Low,
               todoListId: action.payload.todoListId
           }
           return {...state, [action.payload.todoListId]: [newTask,...state[action.payload.todoListId]]}
       }
       case 'CHANGE-TASK': {
           debugger
           return {...state, [action.payload.todoListId]: state[action.payload.todoListId].map(t=>t.id === action.payload.taskId? {...t, status: action.payload.status} : t)}
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
       case "SET_TODOLIST": {
           const stateCopy = { ...state }
          action.todolists.forEach(tl => {
              stateCopy[tl.id] = []
         })
           return stateCopy
       }
       case 'SET-TASKS': {
           return {...state, [action.payload.todoListId]: action.payload.tasks}
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
export const changeTaskStatusAC = (todoListId: string, taskId: string, status: TaskStatuses): ChangeTaskStatusActionType => {
    return {payload: {todoListId, taskId, status}, type: 'CHANGE-TASK'} as const
}
export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {payload: {todoListId, taskId, title}, type: 'CHANGE-TITLE'}
}
export const setTaskAC = (todoListId: string, tasks: Tasks[] ): SetTasksActionType => {
    return {payload: {todoListId, tasks}, type: 'SET-TASKS'}
}

export const fetchTasksTC  = (todolistId: string) => (dispatch: Dispatch) => {
    taskAPI.getTasks(todolistId).then(res =>{
        const tasks = res.data.items
        dispatch(setTaskAC(todolistId, tasks))
    })
}
export const  removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    taskAPI.deleteTask(todolistId, taskId).then(res =>{
        const action = removeTaskAC(todolistId, taskId)
        dispatch(action)
    })
}
