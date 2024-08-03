// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
// import {Tasks, TasksState} from "../types/task.types";
// import {TaskStatuses} from "../types/taskStatuses.types";
// import {TaskPriorities} from "../types/taskPriorities.types";

// let startState: TasksState
//
// beforeEach(()=>{
//     startState = {
//         "todolistId1": [
//             { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
//                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
//             { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
//                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
//             { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
//                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
//         ],
//         "todolistId2": [
//             { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
//                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
//             { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
//                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
//             { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
//                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
//         ]
//     };
// });
//
// test('correct task should be deleted from correct array', () => {
//
//     const action = removeTaskAC( 'todolistId2', '2')
//     const endState = tasksReducer(startState, action)
//
//     expect(endState).toEqual({
//         'todolistId1': [
//             { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
//                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
//             { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
//                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
//             { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
//                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
//         ],
//         'todolistId2': [
//             { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
//                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
//             { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
//                 startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
//         ]
//     })
// })
// test('correct task should be added to correct array', () => {
//     const task: Tasks = { id: "1", title: 'juce', status: TaskStatuses.New, todoListId: "todolistId2", description: '',
//             startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
//     const action = addTaskAC( task)
//     const endState = tasksReducer (startState, action)
//
//     expect(endState['todolistId1'].length).toBe(3)
//     expect(endState['todolistId2'].length).toBe(4)
//     expect(endState['todolistId2'][0].id).toBeDefined()
//     expect(endState['todolistId2'][0].title).toBe('juce')
//     expect(endState['todolistId2'][0].status).toBe(0)
// })
// test('status of specified task should be changed', () => {
//
//     const action = changeTaskStatusAC('todolistId2', '2', 0)
//     const endState = tasksReducer(startState, action)
//
//     expect(endState['todolistId2'][1].status).toBe(0)
//     expect(endState['todolistId2'].length).toBe(3)
// })
// test('title of specified task should be changed', ()=>{
//
//     const action = changeTaskTitleAC('todolistId2', '1', 'juice')
//     const endState = tasksReducer(startState, action)
//
//     expect(endState['todolistId2'][0].title).toBe('juice')
// })
