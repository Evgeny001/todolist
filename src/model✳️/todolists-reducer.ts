import {v1} from "uuid";
import {TodolistDomain} from "../types/todolistDomain.types";
import {FilterValues} from "../types/filterValues.type";
import {Todolists} from "../types/todolist.types";
import {todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    },
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
        id: string
    }
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterValues
    }
}
export type SetTodolistsActionType = {
    type: 'SET_TODOLIST'
    todolists: Array<Todolists>
}
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

const initialState: TodolistDomain[] = []
export const todolistsReducer = (state: TodolistDomain[] = initialState, action: ActionsType): TodolistDomain[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomain = {
                title: action.payload.title, id: action.payload.id, filter: 'all', addedDate: '', order: 12
            }
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        }
        case "SET_TODOLIST": {
            return action.todolists.map(tl=>({
                ...tl, filter: 'all'
            }))
        }
        default:
            return state
    }
}
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", payload: {id: todolistId}} as const
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", payload: {title, id: v1()}} as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {title, id: todolistId}} as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValues): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {filter, id: todolistId}} as const
}
export const setTodolistAC = (todolists: Array<Todolists>): SetTodolistsActionType => {
    return {type: 'SET_TODOLIST', todolists}
}
export const fetchTodolistsThunk = (dispatch: Dispatch) => {
    todolistAPI.getTodolists().then(res => {
        dispatch(setTodolistAC(res.data))
    })
}
