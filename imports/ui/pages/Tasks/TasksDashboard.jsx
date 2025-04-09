import React, { Fragment, useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { CommonBoxDescription } from "../../components/common/CommonBoxDescription";
import { CommonBox } from "../../components/common/CommonBox";
import { CommonBoxTitle } from "../../components/common/CommomBoxTitle";
import { CommonAnchorDashboardBox } from "../../components/common/CommonAnchorDashboardBox";
import { CommonLoadingScreen } from "../../components/common/CommonLoadingScreen";
import { CommonDrawer } from "../../components/common/CommonDrawer";

export const TasksDashboard = () => {

    const areTasksLoading = useSubscribe("tasks");

    const user = useOutletContext();

    const name = user?.profile?.name;
    const email = user?.emails[0]?.address;
    const photo = user?.profile?.photo;

    const registeredTasksCount = useTracker(() => 
        TasksCollection.find().count()
    );

    /** Implementando os filtros */
    const notCompletedFilter = { status: 'Em andamento' }
    const completedFilter = { status: 'Concluída' }

    const pendingTasksCount = useTracker(() =>
        TasksCollection.find(notCompletedFilter).count()
    );

    const completedTasksCount = useTracker(() =>
        TasksCollection.find(completedFilter).count()
    );

    if (!areTasksLoading) return (
        <CommonLoadingScreen />
    );

    return (
        <Fragment>
            <CommonDrawer userName={name} userEmail={email} userPhoto={photo} />
            <Typography
                variant='h5'
                margin='auto'
            >
                Olá {user?.profile?.name}, seja bem-vindo ao ToDo List!
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