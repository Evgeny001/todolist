import React, {FC, memo} from 'react';
import {ButtonProps} from "@mui/material";
import Button from "@mui/material/Button";

interface PropsType extends ButtonProps {
    children: React.ReactNode
}
export const ButtonMemo: FC<PropsType> = memo( ({children, ...rest}) =>  {
    console.log('ButtonMemo')
    return (
        <Button {...rest}>
            {children}
        </Button>
    )
})

