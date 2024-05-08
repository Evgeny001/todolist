import {ChangeEvent} from "react";

type PropsType = {
    checked: boolean
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    className? : string
}
export const Checkbox = ({checked, onChange, className}: PropsType) => {
    return <input type={'checkbox'} onChange={onChange} checked={checked}/>
}
