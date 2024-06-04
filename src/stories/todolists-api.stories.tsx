import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists().then((res) => {
            setState(res.data)
        })
    }, []);
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const createTodolist = () => {
        todolistAPI.createTodolist(title).then(res => {
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'title'} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTodolist}>createTodolist</button>
        </div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistId).then((res) => {
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={deleteTodolist}>deleteTodolist</button>
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTodolistTitle = () => {
        todolistAPI.updateTodolistTitle(todolistId, title).then((res) => {
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'title'} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={updateTodolistTitle}>updateTodolistTitle</button>
        </div>
    </div>
}
