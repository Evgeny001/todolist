import React, { useEffect, useState } from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists().then((res)=>{
          setState(res.data)
      })
    }, []);
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const title = 'qwqwqwqwqwqwqwqwq'
    useEffect(() => {
        todolistAPI.createTodolist(title).then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '596c9d3d-1352-411b-9019-7c54a4c7826e'
    useEffect(() => {todolistAPI.deleteTodolist(todolistId).then((res)=>{
        setState(res.data)
    })}, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'b102148d-05d2-4aa7-8837-9570470ea8a5'
    const title = 'тинькофф'
    useEffect(() => {todolistAPI.updateTodolistTitle(todolistId,title ).then((res)=>{setState(res.data)})}, [])

    return <div>{JSON.stringify(state)}</div>
}
