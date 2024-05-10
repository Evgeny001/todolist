import {ChangeEvent, useState} from "react";
import TextField from '@mui/material/TextField'

type PropsType = {
    value: string
    onChange: (title: string) => void
}
export const EditableSpan = ({value, onChange}: PropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(value)
    const activateEditModeHandler = () => {
        setEditMode(true)
    }
const deactivateEditModeHandler = () => {
    setEditMode(false)
    onChange(title)
}
const changeItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
}
    return (
        <> {editMode ? (
            <TextField
                variant={'outlined'}
                value={title}
                size={'small'}
                onChange={changeItemHandler}
                onBlur={deactivateEditModeHandler}
                autoFocus
            />
        ): (
            <span onDoubleClick={activateEditModeHandler}>{value}</span>
        )}
        </>
    )
}
