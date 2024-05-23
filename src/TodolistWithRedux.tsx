import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import {FilterValuesType, TaskType} from "./App"
import {ChangeEvent} from "react"
import {AddItemForm} from "./AddItemForm"
import {EditableSpan} from "./EditableSpan"
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";
import { TodolistType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./model✳️/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./model✳️/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./model✳️/todolists-reducer";

type PropsType = {
    todolist: TodolistType
}
export const TodolistWithRedux = ({todolist}: PropsType) => {
    const {id, title, filter} = todolist
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])
    const dispatch = useDispatch()

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(id, filter));
    };
    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(id))
    }
    const addTaskCallback = (taskTitle: string) => {
        dispatch(addTaskAC(id, taskTitle))
    }
    const updateTodolistHandler = (title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }
    if (filter === 'active') {
        tasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(task => task.isDone)
    }
    debugger
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
                {tasks.map(task => {
                    const removeTaskHandler = () => {
                        dispatch(removeTaskAC(id,task.id))
                    }
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newStatusValue = e.currentTarget.checked
                        dispatch(changeTaskStatusAC(id, task.id, newStatusValue))
                    }
                    const changeTaskTitleHandler = (title: string) => {
                        dispatch(changeTaskTitleAC(id, task.id, title))
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
