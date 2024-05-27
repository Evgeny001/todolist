import './App.css';
import {Todolist} from "./Todolist"
import {useCallback, useState} from "react"
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import Paper from '@mui/material/Paper'
import CssBaseline from '@mui/material/CssBaseline'
import Switch from '@mui/material/Switch'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {AddItemForm} from "./AddItemForm"
import {MenuButton} from "./MenuButton";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./model✳️/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./model✳️/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./model✳️/store";
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}
export type FilterValuesType = 'all' | 'active' | 'completed'
type ThemeMode = 'dark' | 'light'
export const AppWithRedux = () => {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#087EA4',
            },
        },
    })

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    },[dispatch])
    const changeFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    },[dispatch])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(todolistId, title))
    },[dispatch])
    const changeTaskStatus = useCallback((taskId: string, taskStatus: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, taskStatus))
    },[dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    },[dispatch])
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])
    const updateTask = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    },[dispatch])
    const updateTodolist = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    },[dispatch])
    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static" sx={{ mb: '30px' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <div>
                        <MenuButton color="inherit">Login</MenuButton>
                        <MenuButton color="inherit">Logout</MenuButton>
                        <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                        <Switch color={'default'} onChange={changeModeHandler} />
                    </div>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{ mb: '30px' }}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={4}>
                    {todolists.map(tl => {

                        return(
                            <Grid key={tl.id}>
                                <Paper sx={{ p: '0 20px 20px 20px' }}>
                                    <Todolist key={tl.id}
                                              todolistId={tl.id}
                                              title={tl.title}
                                              tasks={tasks[tl.id]}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              filter={tl.filter}
                                              removeTodolist={removeTodolist}
                                              updateTask={updateTask}
                                              updateTodolist={updateTodolist}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}
