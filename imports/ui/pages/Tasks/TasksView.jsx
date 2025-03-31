import { Meteor } from 'meteor/meteor';
import React, { Fragment } from 'react';
import { useTracker } from "meteor/react-meteor-data";
import { useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import { useOutletContext } from 'react-router-dom';
import { Task } from "../../components/Tasks/Task";
import { TaskForm } from "../../components/Tasks/TaskForm"
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

export const TasksView = () => {

    const areTasksLoading = useSubscribe("tasks");

    const context = useOutletContext();

    const user = context.userData;

    const tasks = useTracker(() => TasksCollection.find(
        { userId: user._id },
        { sort: { createdAt: -1 } }
    ).fetch());

    const handleDelete = ({ _id }) =>
        Meteor.callAsync('tasks.delete', {_id});

    if (!areTasksLoading) return (
        <p>CARREGANDO...</p>
    );

    return (

        <Fragment>

            <Typography 
                variant='h5'
                margin='auto'
            >
                Tarefas cadastradas
            </Typography>

            <TaskForm />

            <List
                sx={{
                    width: '40%',
                    margin: 'auto',
                }}
            >
                {tasks.map(task => (
                <Fragment key={task._id}>
                    <Task
                        task={task}
                        username={user.username}
                        onDeleteClick={handleDelete}
                    />
                    <Divider variant='middle' component='li' />
                </Fragment>
                ))}
            </List>
        </Fragment>
    )

}