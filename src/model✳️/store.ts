import {combineReducers, createStore, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store =  legacy_createStore(rootReducer)
// определить автоматически тип всего объекта
export type AppRootStateType = ReturnType<typeof rootReducer>
// чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
