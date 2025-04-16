import React, { Fragment } from 'react';
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
import { CommonCheckbox } from '../../components/common/CommomCheckbox';
import { Task } from "../../components/Tasks/Task";
import { CommonLoadingScreen } from '../../components/common/CommonLoadingScreen';
import { CommonDrawerHeader } from '../../components/common/CommonDrawerHeader';
import { AddTaskModal } from '../../components/Tasks/AddTaskModal';

const hideCompletedVar = new ReactiveVar(false);

export const TasksView = () => {

    const hideCompleted = useTracker(() => hideCompletedVar.get());

    const areTasksLoading = useSubscribe("pendingTasks", hideCompleted);
    const areUsersLoading = useSubscribe("allUsers");

    const currentUser = useOutletContext();

    const tasks = useTracker(() => TasksCollection.find(
        {},
        { sort: { createdAt: -1 } }
    ).fetch());

    const userMap = useTracker(() => {
        const users = Meteor.users.find().fetch();
        return Object.fromEntries(users.map(u => [u._id, u]));
    }, []);

    const handleDelete = ({ _id }) =>
        Meteor.callAsync('tasks.delete', {_id});

    const handleCompletedCheckboxChange = () => hideCompletedVar.set(!hideCompleted);

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

                    <CommonCheckbox 
                        label='Exibir concluídas'
                        onChange={handleCompletedCheckboxChange}
                    />

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

                <AddTaskModal />

            </Box>     
        </Fragment>
    )

}