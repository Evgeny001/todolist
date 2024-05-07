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
    changeTaskStatus: (taskId: string, taskStatus: boolean) => void
}
export const Todolist = (props: PropsType) => {
    const {title, tasks, date, removeTask, changeFilter, addTask, changeTaskStatus} = props
    const [taskTitle, setTaskTitle] = useState<string>('')
    const addTaskHandler = () => {
        if(taskTitle.trim() !== ''){
            addTask(taskTitle.trim())
            setTaskTitle('')
        }
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
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newStatusValue = e.currentTarget.checked
                        changeTaskStatus(task.id, newStatusValue)
                    }
                    return (
                        <li key={task.id}>
                           <Button title={'X'} onClick={removeTaskHandler}/>
                            <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                            <span>{task.title}</span>
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
