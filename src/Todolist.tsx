import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import {FilterValuesType, TaskType} from "./App"
import React, {ChangeEvent, useCallback} from "react"
import {AddItemForm} from "./AddItemForm"
import {EditableSpan} from "./EditableSpan"
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";

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
    updateTask:(todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}
export const Todolist = React.memo( (props: PropsType) => {
    console.log("Todolist called")
    const {title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter, todolistId, removeTodolist, updateTask, updateTodolist} = props

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, todolistId)
    }
    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }
    const addTaskCallback = useCallback((taskTitle: string) => {
        addTask(taskTitle, todolistId)
    }, [])
    const updateTodolistHandler = (title: string) => {
        updateTodolist(todolistId, title)
    }
    const allTodolistTasks = tasks
        let tasksForTodolist = allTodolistTasks
        if (filter === 'active') {
            tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
        }
        if (filter === 'completed') {
            tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
        }
    return (
        <div>
            <h3>
                <EditableSpan value={title} onChange={updateTodolistHandler}/>
            </h3>
            <IconButton onClick={removeTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
            <Button title={'X'} onClick={removeTodolistHandler}/>
            <div>
                <AddItemForm addItem={addTaskCallback}/>
            </div>
            <List>
                {tasksForTodolist.map(task => {
                    const removeTaskHandler = () => {
                        removeTask(task.id, todolistId)
                    }
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newStatusValue = e.currentTarget.checked
                        changeTaskStatus(task.id, newStatusValue, todolistId)
                    }
                    const changeTaskTitleHandler = (title: string) => {
                        updateTask(todolistId, task.id, title)
                    }
                    return (
                        <ListItem key={task.id}
                                  sx={getListItemSx(task.isDone)}
                                  className={task.isDone ? 'is-done' : ''}>
                            <div>
                                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                            </div>
                            <IconButton onClick={removeTaskHandler}>
                                <DeleteIcon/>
                            </IconButton>
                        </ListItem>
                    )
                })}
            </List>
            <Box sx={filterButtonsContainerSx}>
                <div>
                    <Button
                        variant={filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => changeFilterTasksHandler('all')}
                    >
                        All
                    </Button>
                    <Button
                        variant={filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilterTasksHandler('active')}
                    >
                        Active
                    </Button>
                    <Button
                        variant={filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilterTasksHandler('completed')}
                    >
                        Completed
                    </Button>
                </div>
            </Box>
        </div>
    )
}
)
