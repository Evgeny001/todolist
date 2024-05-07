import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";

type PropsType = {
    title: string
    tasks: TaskType[]
    date?: string
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: () => void
}
export const Todolist = (props: PropsType) => {
    const {title, tasks, date, removeTask, changeFilter, addTask} = props
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
               <Button title={'+'} onClick={addTask}/>
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
                <Button title={'All'} onClick={()=>changeFilter('all')} />
                <Button title={'Active'} onClick={()=>changeFilter('active')} />
                <Button title={'Completed'} onClick={()=>changeFilter('completed')} />
            </div>
            <div>{date}</div>
        </div>
    )
}
