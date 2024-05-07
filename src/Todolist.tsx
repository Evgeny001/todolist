import {TasksType} from "./App";
import {Button} from "./Button";

type PropsType = {
    title: string
    tasks: TasksType[]
    date?: string
}
export const Todolist = (props: PropsType) => {
    const {title, tasks, date} = props
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
