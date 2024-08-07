import {AnyAction, applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { tasksReducer } from "../features/tasks-reducer";
import { todolistsReducer } from "../features/todolists-reducer";
import { useDispatch } from "react-redux";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// типизация для thunk dispatch
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

// хук для использования dispatch с thunk
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
// чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
