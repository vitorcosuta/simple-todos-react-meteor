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
import { CommonSearchBar } from '../../components/common/CommonSearchBar';

const PAGE_SIZE = 4;
const hideCompletedVar = new ReactiveVar(false);

export const TasksView = () => {

    const [page, setPage] = useState(1);
    const [totalTasks, setTotalTasks] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const hideCompleted = useTracker(() => hideCompletedVar.get());

    const totalPages = useMemo(() => {
        return Math.ceil(totalTasks / PAGE_SIZE);
    }, [totalTasks]);

    const filterParams = {
        page,
        pageSize: PAGE_SIZE,
        hideCompleted,
        searchTerm,
    };

    const areTasksLoading = useSubscribe("tasks", filterParams);
    const areUsersLoading = useSubscribe("allUsers");

    const currentUser = useOutletContext();

    const tasks = useTracker(() => {
        return TasksCollection.find({}, {
          sort: { createdAt: -1 }
        }).fetch();
    });

    const regex = new RegExp(searchTerm, 'i');

    const filter = {
        ...(hideCompleted ? { status: { $ne: 'Concluída' } } : {}),
        ...(searchTerm ? { name: { $regex: regex } } : {}),
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
    }, [tasks]);

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
    };

    const handleCompletedCheckboxChange = () => {
        hideCompletedVar.set(!hideCompleted);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
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
                        mb: 10,
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
                            alignItems: 'center',
                        }}
                    >
                        <AddTaskModal />

                        <CommonCheckbox 
                            label='Exibir concluídas'
                            onChange={handleCompletedCheckboxChange}
                        />

                        <CommonSearchBar onChange={handleSearchChange} value={searchTerm} />
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