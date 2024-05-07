import {TaskType} from "./App";
import {Button} from "./Button";

type PropsType = {
    title: string
    tasks: TaskType[]
    date?: string
    removeTask: (taskId: number) => void
}
export const Todolist = (props: PropsType) => {
    const {title, tasks, date, removeTask} = props
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(task => {
                    return (
                        <li key={task.id}>
                           <Button title={'X'} onClick={()=>removeTask(task.id)}/>
                            <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button title={'All'} />
                <Button title={'Active'} />
                <Button title={'Completed'} />
            </div>
            <div>{date}</div>
        </div>
    )
}
