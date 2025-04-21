import React from "react"
import { useSubscribe } from "meteor/react-meteor-data";
import { useParams } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import Box from "@mui/material/Box";
import { EditTaskForm } from "../../components/Tasks/EditTaskForm";
import { CommonLoadingScreen } from "../../components/common/CommonLoadingScreen";

export const TasksEdit = () => {

    const areTasksLoading = useSubscribe("tasks"); 

    const { id } = useParams();

    const task = useTracker(() => TasksCollection.findOne({ _id: id }));

    if (!areTasksLoading) return (
        <CommonLoadingScreen />
    );

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
                backgroundColor: '#f2dcd8',
            }}
        >
            <EditTaskForm task={task} />
        </Box>
    );
}