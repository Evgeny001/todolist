import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import {AddItemForm} from "./AddItemForm"
import {EditableSpan} from "./EditableSpan"
import {filterButtonsContainerSx} from "./Todolist.styles";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./model✳️/store";
import { addTaskTC, fetchTasksTC} from "./model✳️/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./model✳️/todolists-reducer";
import {FilterValues} from "./types/filterValues.type";
import {Tasks} from "./types/task.types";
import {TodolistDomain} from "./types/todolistDomain.types";
import {TaskWithRedux} from "./TaskWithRedux";
import {useEffect} from "react";

type PropsType = {
    todolist: TodolistDomain
}
export const TodolistWithRedux = ({todolist}: PropsType) => {
    const {id, title, filter} = todolist
    let tasks = useSelector<AppRootStateType, Array<Tasks>>(state => state.tasks[id])
    const dispatch = useAppDispatch()

    const changeFilterTasksHandler = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC(id, filter));
    };
    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(id))
    }
    const addTaskCallback = (taskTitle: string) => {
        dispatch(addTaskTC(id, taskTitle))
    }
    const updateTodolistHandler = (title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }
    if (filter === 'active') {
        tasks = tasks.filter(task => !task.status)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(task => task.status)
    }
    useEffect(() => {
        dispatch(fetchTasksTC(todolist.id))
    }, []);
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
                    return ( <TaskWithRedux task={task} todolistId={todolist.id}/>
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
