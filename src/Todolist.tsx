import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    title: string
    tasks: TaskType[]
    date?: string
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}
export const Todolist = (props: PropsType) => {
    const {title, tasks, date, removeTask, changeFilter, addTask} = props
    const [taskTitle, setTaskTitle] = useState<string>('')
    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }
    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }
    const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter)
    }
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                    onChange={changeTaskTitleHandler}
                       onKeyUp={addTaskOnKeyUpHandler}/>
               <Button title={'+'}
                       onClick={addTaskHandler}/>
            </div>
            <ul>
                {tasks.map(task => {
                    const removeTaskHandler = () => {
                        removeTask(task.id)
                    }
                    return (
                        <li key={task.id}>
                           <Button title={'X'} onClick={removeTaskHandler}/>
                            <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button title={'All'} onClick={() => changeFilterTasksHandler('all')} />
                <Button title={'Active'} onClick={() => changeFilterTasksHandler('active')} />
                <Button title={'Completed'} onClick={() => changeFilterTasksHandler('completed')} />
            </div>
            <div>{date}</div>
        </div>
    )
}
