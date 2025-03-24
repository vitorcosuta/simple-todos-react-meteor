import React, { Fragment } from "react"
import { useOutletContext } from "react-router-dom";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { CommonBoxDescription } from "../../components/common/CommonBoxDescription";
import { CommonBox } from "../../components/common/CommonBox";

export const Home = () => {

    const user = useOutletContext().userData;

    return (
        <Fragment>
            <Typography
                variant='h5'
                margin='auto'
            >
                Olá {user.username}, seja bem-vindo ao ToDo List!
            </Typography>
            
            <Stack direction="row" spacing={40} margin='auto'>
                <Stack direction="column" spacing={10} margin="auto">
                    <CommonBox>
                        <CommonBoxDescription>Total de tarefas cadastradas</CommonBoxDescription>
                    </CommonBox>

                    <CommonBox>
                        <CommonBoxDescription>Total de tarefas pendentes</CommonBoxDescription>
                    </CommonBox>
                </Stack>

                <Stack direction="column" spacing={10} margin="auto">
                    <CommonBox>
                        <CommonBoxDescription>Total de tarefas concluídas</CommonBoxDescription>
                    </CommonBox>
                    <CommonBox>
                        <CommonBoxDescription>Total de tarefas pendentes</CommonBoxDescription>
                    </CommonBox>
                </Stack>
            </Stack>
        </Fragment>
    );
}