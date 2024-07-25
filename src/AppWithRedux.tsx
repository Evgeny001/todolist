import './App.css';
import {useCallback, useEffect, useState} from "react"
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
import {addTodolistAC, setTodolistAC,} from "./model✳️/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./model✳️/store";
import {TodolistDomain} from "./types/todolistDomain.types";
import {TodolistWithRedux} from "./TodolistWithRedux";
import {todolistAPI} from "./api/todolist-api";

export type FilterValuesType = 'all' | 'active' | 'completed'
type ThemeMode = 'dark' | 'light'
export const AppWithRedux = () => {
    useEffect(()=>{
       todolistAPI.getTodolists().then(res=>{
           const todos = res.data
           dispatch(setTodolistAC(todos))
       })
    },[])
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#087EA4',
            },
        },
    })

    const todolists = useSelector<AppRootStateType, Array<TodolistDomain>>(state => state.todolists)
    const dispatch = useDispatch()
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])
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
                                    <TodolistWithRedux todolist={tl}/>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}
