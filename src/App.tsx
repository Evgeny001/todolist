import './App.css';
import {Todolist} from "./Todolist";
export type TasksType = {
    id: number
    title: string
    isDone: boolean
}
function App() {
    const tasks1: TasksType[] = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
    ]
    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks1} date={'21.03.2024'} />
        </div>
    );
}

export default App;
