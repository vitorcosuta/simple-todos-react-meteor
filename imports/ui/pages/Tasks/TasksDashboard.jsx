import React, { Fragment } from "react"
import { useOutletContext } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { CommonBoxDescription } from "../../components/common/CommonBoxDescription";
import { CommonBox } from "../../components/common/CommonBox";
import { CommonBoxTitle } from "../../components/common/CommomBoxTitle";
import { CommonAnchorDashboardBox } from "../../components/common/CommonAnchorDashboardBox";

export const TasksDashboard = () => {

    const context = useOutletContext();

    const user = context.userData;

    const registeredTasksCount = useTracker(() => 
        TasksCollection.find().count()
    );

    /** Implementando os filtros */
    const notCompletedFilter = { isChecked: { $ne: true } }
    const completedFilter = { isChecked: true }

    const pendingTasksCount = useTracker(() =>
        TasksCollection.find(notCompletedFilter).count()
    );

    const completedTasksCount = useTracker(() =>
        TasksCollection.find(completedFilter).count()
    );

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
                        <CommonBoxTitle>{registeredTasksCount}</CommonBoxTitle>
                    </CommonBox>

                    <CommonBox>
                        <CommonBoxDescription>Total de tarefas pendentes</CommonBoxDescription>
                        <CommonBoxTitle>{pendingTasksCount}</CommonBoxTitle>
                    </CommonBox>
                </Stack>

                <Stack direction="column" spacing={10} margin="auto">
                    <CommonBox>
                        <CommonBoxDescription>Total de tarefas concluídas</CommonBoxDescription>
                        <CommonBoxTitle>{completedTasksCount}</CommonBoxTitle>
                    </CommonBox>
                    <CommonAnchorDashboardBox
                        goto={'/tasks/view'}
                    >Visualizar tarefas</CommonAnchorDashboardBox>
                </Stack>
            </Stack>
        </Fragment>
    );
}