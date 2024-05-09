import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Checkbox} from "./Checkbox";
import {AddItemForm} from "./AddItemForm";

type PropsType = {
    title: string
    tasks: TaskType[]
    date?: string
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValuesType
}
export const Todolist = (props: PropsType) => {
    const {title, tasks, date, removeTask, changeFilter, addTask, changeTaskStatus, filter, todolistId, removeTodolist} = props

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, todolistId)
    }
    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }
    const addTaskCallback = (taskTitle: string) => {
        addTask(taskTitle, todolistId)
    }
    return (
        <div>
            <h3>{title}</h3>
            <Button title={'X'} onClick={removeTodolistHandler}/>
            <div>
               <AddItemForm addItem={addTaskCallback}/>
            </div>
            <ul>
                {tasks.map(task => {
                    const removeTaskHandler = () => {
                        removeTask(task.id, todolistId)
                    }
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newStatusValue = e.currentTarget.checked
                        changeTaskStatus(task.id, newStatusValue, todolistId)
                    }
                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                           <Button title={'X'} onClick={removeTaskHandler}/>
                            <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                            <span>{task.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button
                    className={filter === 'all' ? 'active-filter' : '' }
                    title={'All'}
                    onClick={() => changeFilterTasksHandler('all')}
                />
                <Button
                    className={filter === 'active'? 'active-filter' : '' }
                    title={'Active'}
                    onClick={() => changeFilterTasksHandler('active')}
                />
                <Button
                    className={filter === 'completed' ? 'active-filter' : ''}
                    title={'Completed'}
                    onClick={() => changeFilterTasksHandler('completed')}
                />
            </div>
            <div>{date}</div>
        </div>
    )
}
