import {ChangeEvent, useState} from "react";

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
            <input value={title}
                   onBlur={deactivateEditModeHandler}
                   onChange={changeItemHandler}
                   autoFocus
            />
        ): (
            <span onDoubleClick={activateEditModeHandler}>{value}</span>
        )}
        </>
    )
}
