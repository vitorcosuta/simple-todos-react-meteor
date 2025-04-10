import React, { Fragment, useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { useSubscribe } from "meteor/react-meteor-data";
import { useNavigate } from "react-router-dom";
import { TasksCollection } from "/imports/api/TasksCollection";
import Box from '@mui/material/Box';
import { CommonLoadingScreen } from "../../components/common/CommonLoadingScreen";
import { CommonPermanentDrawer } from "../../components/common/CommonPermanentDrawer";
import { CommonDashboardCard } from "../../components/common/CommonDashboardCard";
import { CommonButtonCard } from "../../components/common/CommonButtonCard";

export const TasksDashboard = () => {

    const navigate = useNavigate();

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

    const handleClick = () => navigate('/tasks/view')

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100vw',
                height: '100vh',
            }}
        >
            <CommonPermanentDrawer userName={name} userEmail={email} userPhoto={photo} />
            
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                    alignContent: 'flex-start',
                    width: '85%',
                    height: '100%',
                    pt: '15vh',
                    rowGap: 8,
                    columnGap: 4,
                    backgroundColor: '#f2dcd8'
                }}
            >
                <CommonDashboardCard 
                    title='Tarefas cadastradas' 
                    metric={registeredTasksCount} 
                />
                <CommonDashboardCard 
                    title='Tarefas em andamento' 
                    metric={pendingTasksCount} 
                />
                <CommonDashboardCard 
                    title='Tarefas concluídas' 
                    metric={completedTasksCount} 
                />
                <CommonButtonCard 
                    title='Visualizar tarefas'
                    onClick={handleClick}
                />
            </Box>
        </Box>
    );
}