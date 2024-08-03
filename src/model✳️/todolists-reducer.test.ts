// import {v1} from "uuid";
// import {
//     addTodolistAC,
//     changeTodolistFilterAC,
//     changeTodolistTitleAC,
//     removeTodolistAC,
//     todolistsReducer
// } from "./todolists-reducer";
// import {TodolistDomain} from "../types/todolistDomain.types";
//
// let todolistId1: string
// let todolistId2: string
// let startState: TodolistDomain[]
//
//     beforeEach(()=> {
//      todolistId1 = v1()
//      todolistId2 = v1()
//
//      startState = [
//         { id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 1 },
//         { id: todolistId2, title: 'What to buy', filter: 'all' , addedDate: '', order: 2},
//     ]
// })
//
// test('correct todolist should be removed', ()=> {
//
//     const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))
//     expect(endState.length).toBe(1)
//     expect(endState[0].id).toBe(todolistId2)
// })

// test('correct todolist should be added', () => {
//
//     const newTitle = 'New Todolist'
//
//     const endState = todolistsReducer(startState, addTodolistAC(newTitle))
//
//     expect(endState.length).toBe(3)
//     expect(endState[0].title).toBe(newTitle)
// })

// test('correct todolist should change its name', () => {
//
//     const newTitle = 'New Todolist'
//
//     const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTitle,))
//
//     expect(endState[0].title).toBe('What to learn')
//     expect(endState[1].title).toBe(newTitle)
// })
//
// test('correct filter of todolist should be changed', ()=> {
//
//     const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2,'completed' ))
//
//     expect(endState[0].filter).toBe('all')
//     expect(endState[1].filter).toBe('completed')
// })
