import './App.css';
import {Todolist} from "./Todolist";
import {randomUUID} from "node:crypto";
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
function App() {
    const tasks1: TasksType[] = [
        { id: randomUUID(), title: 'HTML&CSS', isDone: true },
        { id: randomUUID(), title: 'JS', isDone: true },
        { id: randomUUID(), title: 'ReactJS', isDone: false },
    ]

    const tasks2: TasksType[] = [
        { id: randomUUID(), title: 'Hello world', isDone: true },
        { id: randomUUID(), title: 'I am Happy', isDone: false },
        { id: randomUUID(), title: 'Yo', isDone: false },
    ]

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks1} date={'21.03.2024'} />
            <Todolist title="Songs" tasks={tasks2} />
        </div>
    );
}

export default App;
