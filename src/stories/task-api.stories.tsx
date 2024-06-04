import { useState} from "react";
import {taskAPI} from "../api/task-api";

export default {
    title: 'API',
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasks = () => {
        taskAPI.getTasks(todolistId).then((res) => setState(res.data))
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={getTasks}>getTasks</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTask = () => {
        taskAPI.createTask(todolistId, title).then((res) => {
            setState(res.data)
        })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'title'} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={createTask}>createTask</button>
        </div>
    </div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTaskTitle = () => {
        taskAPI.updateTaskTitle(todolistId, taskId, title).then((res) => {
            setState(res.data)
        })
    }
    return <div>{JSON.stringify(state)}
        <input placeholder={'todolistId'} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input placeholder={'taskId'} onChange={(e) => {
            setTaskId(e.currentTarget.value)
        }}/>
        <input placeholder={'title'} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <button onClick={updateTaskTitle}>updateTaskTitle</button>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        taskAPI.deleteTask(todolistId, taskId).then((res) => {
            setState(res.data)
        })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'taskId'} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>deleteTask</button>
        </div>
    </div>
}
