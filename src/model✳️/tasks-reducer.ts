import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {Tasks, TasksState} from "../types/task.types";
import {TaskStatuses} from "../types/taskStatuses.types";
import {Dispatch} from "redux";
import {taskAPI} from "../api/task-api";
import {AppRootStateType} from "./store";

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
        task: Tasks
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
           return {...state, [action.payload.task.todoListId]: [action.payload.task,...state[action.payload.task.todoListId]]}
           // const stateCopy = {...state}
           // const tasks: Tasks[] = stateCopy[action.payload.task.todoListId];
           // const newTasks = [action.payload.task, ...tasks];
           // stateCopy[action.payload.task.todoListId] = newTasks;
           // return stateCopy;

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
           return {...state, [action.payload.todolist.id]: []};
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
export const addTaskAC = (task: Tasks): AddTaskActionType => {
    return {payload: {task}, type: 'ADD-TASK'} as const
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
    taskAPI.deleteTask(todolistId, taskId).then(() =>{
        const action = removeTaskAC(todolistId, taskId)
        dispatch(action)
    })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    taskAPI.createTask(todolistId, title).then((res)=>{
        const task = res.data.data.item
        const action = addTaskAC(task)
        dispatch(action)
    })
}
export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses ) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const allTasksFromState = getState().tasks
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })

        if (task) {
            taskAPI
                .updateTask(todolistId, taskId, {
                    title: task.title,
                    startDate: task.startDate,
                    priority: task.priority,
                    description: task.description,
                    deadline: task.deadline,
                    status: status,
                })
                .then((res) => {
                    const resStatus: TaskStatuses = res.data.data.item.status
                    const action = changeTaskStatusAC(todolistId, taskId, resStatus)
                    dispatch(action)
                })
        }
    }
}
