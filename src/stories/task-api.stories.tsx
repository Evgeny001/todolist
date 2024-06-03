import {useEffect, useState} from "react";
import {taskAPI} from "../api/task-api";

export default {
    title: 'API',
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'f20e7abe-66c2-44f2-baac-89396a0a80c3'
    useEffect(() => {
        taskAPI.getTasks(todolistId).then((res)=> setState(res.data))
    }, []);
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'f20e7abe-66c2-44f2-baac-89396a0a80c3'
    const title = '1-Task'
    useEffect(() => {
        taskAPI.createTask(todolistId, title).then((res)=>{setState(res.data)})
    }, []);
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'f20e7abe-66c2-44f2-baac-89396a0a80c3'
    const taskId = '1716071d-04a7-4afb-9f8d-58df577f3cee'
    const title = 'hello'
    useEffect(() => {
        taskAPI.updateTaskTitle(todolistId, taskId, title).then((res)=>{setState(res.data)})
    }, []);
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'f20e7abe-66c2-44f2-baac-89396a0a80c3'
    const taskId = 'b16da642-a20d-474a-8d7c-a4c8779a4353'
    useEffect(() => {
        taskAPI.deleteTask(todolistId, taskId).then((res)=>{setState(res.data)})
    }, []);
    return <div>{JSON.stringify(state)}</div>
}
