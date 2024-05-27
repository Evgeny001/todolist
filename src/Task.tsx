import React, {ChangeEvent, useCallback} from "react";
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "./Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskType } from "./App";

type PropsType = {
    task: TaskType
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    updateTask:(todolistId: string, taskId: string, title: string) => void
    todolistId: string
}
export const Task = React.memo( ({task, removeTask, changeTaskStatus, updateTask, todolistId}: PropsType) => {
    const onClickHandler  = useCallback(() => {
        removeTask(task.id, todolistId)
    }, [removeTask, todolistId])
    const onChangeHandler  = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(task.id, newStatusValue, todolistId)
    }, [changeTaskStatus, todolistId])
    const onTitleChangeHandler   = useCallback((title: string) => {
        updateTask(todolistId, task.id, title)
    }, [updateTask, todolistId])
    return (
        <ListItem key={task.id}
                  sx={getListItemSx(task.isDone)}
                  className={task.isDone ? 'is-done' : ''}>
            <div>
                <Checkbox checked={task.isDone} onChange={onChangeHandler}/>
                <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            </div>
            <IconButton onClick={onClickHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}
)
