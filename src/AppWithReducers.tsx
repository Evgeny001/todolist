import './App.css';
import {Todolist} from "./Todolist"
import {useReducer, useState} from "react"
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
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm"
import {MenuButton} from "./MenuButton";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./model✳️/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./model✳️/tasks-reducer";
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
export const AppWithReducers = () => {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#087EA4',
            },
        },
    })

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dishatchToTodolists] = useReducer(todolistsReducer,[
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, dishatchToTasks] = useReducer(tasksReducer,{
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    })
    const removeTask = (taskId: string, todolistId: string) => {
        dishatchToTasks(removeTaskAC(todolistId, taskId))
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        dishatchToTodolists(changeTodolistFilterAC(todolistId, filter))
    }
    const addTask = (title: string, todolistId: string) => {
        dishatchToTasks(addTaskAC(todolistId, title))
    }
    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        dishatchToTasks(changeTaskStatusAC(todolistId, taskId, taskStatus))
    }
    const removeTodolist = (todolistId: string) => {
   dishatchToTodolists(removeTodolistAC(todolistId))
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dishatchToTodolists(action)
        dishatchToTasks(action)
    }
    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dishatchToTasks(changeTaskTitleAC(todolistId, taskId, title))
    }
    const updateTodolist = (todolistId: string, title: string) => {
        dishatchToTodolists(changeTodolistTitleAC(todolistId, title))
    }
    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }
    debugger
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
                const allTodolistTasks = tasks[tl.id]
                let tasksForTodolist = allTodolistTasks
                if (tl.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                }
                return(
                    <Grid>
                        <Paper sx={{ p: '0 20px 20px 20px' }}>
                    <Todolist key={tl.id}
                              todolistId={tl.id}
                              title={tl.title}
                              tasks={tasksForTodolist}
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

