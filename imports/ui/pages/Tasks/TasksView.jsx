import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from "meteor/reactive-var";
import { useTracker } from "meteor/react-meteor-data";
import { useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import { useOutletContext } from 'react-router-dom';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import { CommonCheckbox } from '../../components/common/CommomCheckbox';
import { Task } from "../../components/Tasks/Task";
import { CommonLoadingScreen } from '../../components/common/CommonLoadingScreen';
import { CommonDrawerHeader } from '../../components/common/CommonDrawerHeader';
import { AddTaskModal } from '../../components/Tasks/AddTaskModal';

const PAGE_SIZE = 4;
const hideCompletedVar = new ReactiveVar(false);

export const TasksView = () => {

    const [page, setPage] = useState(1);
    const [totalTasks, setTotalTasks] = useState(0);

    const hideCompleted = useTracker(() => hideCompletedVar.get());

    const totalPages = useMemo(() => {
        return Math.ceil(totalTasks / PAGE_SIZE);
    }, [totalTasks]);

    const areTasksLoading = useSubscribe("pendingTasks", { page, pageSize: PAGE_SIZE, hideCompleted });
    const areUsersLoading = useSubscribe("allUsers");

    const currentUser = useOutletContext();

    const tasks = useTracker(() => {
        return TasksCollection.find({}, {
          sort: { createdAt: -1 }
        }).fetch();
    });

    const filter = {
        ...(hideCompleted ? { status: { $ne: 'Concluída' } } : {}),
        $or: [
            { userId: this.userId },      // Tarefas do usuário atual
            { isPersonal: false }          // Tarefas públicas
        ]
    };

    const getCount = async () => {
        const total = await Meteor.callAsync('tasks.count', filter);
        setTotalTasks(total);
    };
    
    useEffect(() => {
        getCount();
    }, [hideCompleted]);

    useEffect(() => {
        if (page > totalPages && totalPages > 0) {
          setPage(totalPages);
        }
    }, [totalPages, page]);

    const userMap = useTracker(() => {
        const users = Meteor.users.find().fetch();
        return Object.fromEntries(users.map(u => [u._id, u]));
    }, []);

    const handleDelete = ({ _id }) => {
        Meteor.callAsync('tasks.delete', {_id});
        getCount();
    };

    const handleCompletedCheckboxChange = () => {
        hideCompletedVar.set(!hideCompleted);
    };

    const handlePageChange = (event, value) => setPage(value);

    if (!areTasksLoading || !areUsersLoading) return (
        <CommonLoadingScreen />
    );

    return (

        <Fragment>
            <CommonDrawerHeader currentUser={currentUser} />

            <Box
                sx={{
                    width: '80vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: 'auto',
                    pt: 4,
                }}
            >
                <Typography 
                    variant='h5'
                    sx={{
                        whiteSpace: 'pre-line',
                        fontFamily: 'source-sans-pro-latin-400-normal, sans-serif',
                        color: '#262423',
                        mb: 4,
                    }}
                >
                    Tarefas cadastradas
                </Typography>

                <Box sx={{ width: '100%' }}>
                    
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <CommonCheckbox 
                            label='Exibir concluídas'
                            onChange={handleCompletedCheckboxChange}
                        />

                        <AddTaskModal getCount={getCount} />
                    </Box>

                    <List>
                        {tasks.map(task => {

                            const user = userMap[task.userId];
                            const name = user?.profile?.name;

                            return (
                                <Fragment key={task._id}>
                                    <Task
                                        task={task}
                                        username={name}
                                        currentUserId={currentUser._id}
                                        onDeleteClick={handleDelete}
                                    />
                                    <Divider variant='middle' component='li' />
                                </Fragment>
                            );
                        })}
                    </List>
                </Box>

                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                />

            </Box>     
        </Fragment>
    )

}