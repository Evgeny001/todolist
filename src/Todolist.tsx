import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import React, {useCallback} from "react"
import {AddItemForm} from "./AddItemForm"
import {EditableSpan} from "./EditableSpan"
import {filterButtonsContainerSx} from "./Todolist.styles";
import {ButtonMemo} from "./ButtonMemo";
import {Tasks} from "./types/task.types";
import {FilterValues} from "./types/filterValues.type";
import {Task} from "./Task";

type PropsType = {
    title: string
    tasks: Tasks[]
    date?: string
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValues, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: number, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValues
    updateTask:(todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}
export const Todolist = React.memo( (props: PropsType) => {
    console.log("Todolist called")
    const {title, tasks, changeFilter, addTask, filter, todolistId, removeTodolist, updateTodolist} = props
    const onAllClickHandler = useCallback(()=>{
    changeFilter('all', todolistId)
    }, [todolistId])
    const onActiveClickHandler = useCallback(()=>{
            changeFilter('active', todolistId)
        }, [todolistId])
    const onCompletedClickHandler = useCallback(()=>{
            changeFilter('completed', todolistId)
        }, [todolistId])
    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }
    const addTaskCallback = useCallback((taskTitle: string) => {
        addTask(taskTitle, todolistId)
    }, [addTask, todolistId])
    const updateTodolistHandler = useCallback((title: string) => {
        updateTodolist(todolistId, title)
    },[updateTodolist, todolistId])
    const allTodolistTasks = tasks
        let tasksForTodolist = allTodolistTasks
        if (filter === 'active') {
            tasksForTodolist = allTodolistTasks.filter(task => task.status === 0)
        }
        if (filter === 'completed') {
            tasksForTodolist = allTodolistTasks.filter(task => task.status === 2 )
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
                {tasksForTodolist.map(t => {
                    return <Task key={t.id} task={t}
                          todolistId={todolistId} changeTaskStatus={props.changeTaskStatus} updateTask={props.updateTask} removeTask={props.removeTask}/>
                })}
            </List>
            <Box sx={filterButtonsContainerSx}>
                <div>
                    <ButtonMemo
                        variant={filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={onAllClickHandler}
                    >
                        All
                    </ButtonMemo>
                    <ButtonMemo
                        variant={filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={onActiveClickHandler}
                    >
                        Active
                    </ButtonMemo>
                    <ButtonMemo
                        variant={filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={onCompletedClickHandler}
                    >
                        Completed
                    </ButtonMemo>
                </div>
            </Box>
        </div>
    )
}
)
