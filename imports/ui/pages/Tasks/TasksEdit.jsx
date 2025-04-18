import React from "react"
import { useSubscribe } from "meteor/react-meteor-data";
import { useParams } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import { EditTaskForm } from "../../components/Tasks/EditTaskForm";

export const TasksEdit = () => {

    const areTasksLoading = useSubscribe("tasks"); 

    const { id } = useParams();

    const task = useTracker(() => TasksCollection.findOne({ _id: id }));

    if (!areTasksLoading) return (
        <p>CARREGANDO...</p>
    );

    return (
        <EditTaskForm task={task} />
    );
}