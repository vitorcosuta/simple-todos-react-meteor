import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from "meteor/reactive-var";
import React, { Fragment } from 'react';
import { useTracker } from "meteor/react-meteor-data";
import { useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import { useOutletContext } from 'react-router-dom';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { CommonCheckbox } from '../../components/common/CommomCheckbox';
import { Task } from "../../components/Tasks/Task";
import { TaskForm } from "../../components/Tasks/TaskForm"
import { CommonLoadingScreen } from '../../components/common/CommonLoadingScreen';
import { CommonDrawerHeader } from '../../components/common/CommonDrawerHeader';

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
            <Typography 
                variant='h5'
                margin='auto'
            >
                Tarefas cadastradas
            </Typography>

            <TaskForm />

            <CommonCheckbox 
                label='Exibir concluídas'
                onChange={handleCompletedCheckboxChange}
            />

            <List
                sx={{
                    width: '80%',
                    margin: 'auto',
                }}
            >
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
        </Fragment>
    )

}