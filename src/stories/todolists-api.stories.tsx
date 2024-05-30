import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default {
    title: 'API',
}

const settings = {
    withCredentials: true,
    headers: { 'API-KEY': 'e5cb4230-28c5-474d-85e1-4e3f997cae50'}
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
      axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings).then((res)=>{
          setState(res.data)
      })
    }, []);
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios
            .post(
                'https://social-network.samuraijs.com/api/1.1/todo-lists',
                { title: 'newTodolist' },
                settings
            )
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${'ad8a51f4-b150-446b-9ec1-2d747567cc69'}`, settings).then((res)=>{
        setState(res.data)
    })}, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${'33b8429c-c09d-4ea1-bffb-fd581e969482'}`,
        {title: 'hello-hello-hello-'}, settings).then((res)=>{setState(res.data)})}, [])

    return <div>{JSON.stringify(state)}</div>
}
