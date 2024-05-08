import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = 'all' | 'active' | 'completed'
function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Redux', isDone: false },
        { id: v1(), title: 'Typescript', isDone: false },
        { id: v1(), title: 'RTK query', isDone: false },
    ])
    let [todolists, setTodolists] = useState<TodolistType[]>([
        { id: v1(), title: 'What to learn', filter: 'all' },
        { id: v1(), title: 'What to buy', filter: 'all' },
    ])
    const removeTask = (taskId: string) => {
    const filteredTasks = tasks.filter(task => {
        return task.id !== taskId
    })
        setTasks(filteredTasks)
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, filter } : tl)))
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks([newTask,...tasks])
    }
    const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
        const newState = tasks.map(t=> (t.id === taskId ? {...t, isDone: taskStatus} : t))
        setTasks(newState)
    }
    return (
        <div className="App">
            {todolists.map(tl => {
                let tasksForTodolist = tasks
                if(tl.filter === 'active') {
                    tasksForTodolist = tasks.filter(task => !task.isDone)
                }
                if(tl.filter === 'completed'){
                    tasksForTodolist = tasks.filter(task => task.isDone)
                }
                return(
                    <Todolist key={tl.id}
                              todolistId={tl.id}
                              title={tl.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              filter={tl.filter}
                    />
                )
            })}
        </div>
    );
}

export default App;
