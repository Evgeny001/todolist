import React, {ChangeEvent} from "react";
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "./Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./model✳️/tasks-reducer";
import {TaskStatuses} from "./types/taskStatuses.types";
import {Tasks} from "./types/task.types";

type PropsType = {
    task: Tasks
    todolistId: string
}
export const TaskWithRedux = React.memo( ({task, todolistId}: PropsType) => {
    const dispatch = useDispatch()
    const onClickHandler = () => dispatch(removeTaskAC(todolistId, task.id))
    const onChangeHandler  = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue: TaskStatuses = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        debugger
        dispatch(changeTaskStatusAC(todolistId, task.id, newStatusValue))
    }
    const onTitleChangeHandler   = (title: string) => {
    dispatch(changeTaskTitleAC(todolistId, task.id, title))
    }
    return (
        <ListItem key={task.id}
                  sx={getListItemSx(task.status === 2 ? true : false)}
                  className={task.status === 2 ? 'is-done' : ''}>
            <div>
                <Checkbox checked={task.status === 2 ? true : false} onChange={onChangeHandler}/>
                <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            </div>
            <IconButton onClick={onClickHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}
)
