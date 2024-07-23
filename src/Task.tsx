import React, {ChangeEvent, useCallback} from "react";
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "./Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {Tasks} from "./types/task.types";
import {TaskStatuses} from "./types/taskStatuses.types";

type PropsType = {
    task: Tasks
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: number, todolistId: string) => void
    updateTask:(todolistId: string, taskId: string, title: string) => void
    todolistId: string
}
export const Task = React.memo( ({task, removeTask, changeTaskStatus, updateTask, todolistId}: PropsType) => {
    const onClickHandler  = useCallback(() => {
        removeTask(task.id, todolistId)
    }, [removeTask, todolistId])
    const onChangeHandler  = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue: TaskStatuses = e.currentTarget.checked === true ? TaskStatuses.Completed : TaskStatuses.New
        changeTaskStatus(task.id, newStatusValue, todolistId)
    }, [changeTaskStatus, todolistId])
    const onTitleChangeHandler   = useCallback((title: string) => {
        updateTask(todolistId, task.id, title)
    }, [updateTask, todolistId])
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
