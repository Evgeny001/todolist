import React, {ChangeEvent} from "react";
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "../../../Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeTaskTC, updateTaskStatusTC} from "../../tasks-reducer";
import {TaskStatuses} from "../../../types/taskStatuses.types";
import {Tasks} from "../../../types/task.types";
import {useAppDispatch} from "../../../app/store";

type PropsType = {
    task: Tasks
    todolistId: string
}
export const TaskWithRedux = React.memo( ({task, todolistId}: PropsType) => {
    const dispatch = useAppDispatch()
    const onClickHandler = () => dispatch(removeTaskTC(todolistId, task.id))
    const onChangeHandler  = (e: ChangeEvent<HTMLInputElement>) => {
        const status: TaskStatuses = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskStatusTC(task.id, todolistId, {status}))
    }
    const onTitleChangeHandler   = (title: string) => {
    dispatch(updateTaskStatusTC(task.id, todolistId, {title}))
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
