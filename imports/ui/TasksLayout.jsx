import React, { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";

export const TasksLayout = () => {

    const userData = useOutletContext();
    const areTasksLoading = useSubscribe("tasks");
    const [filter, setFilter] = useState({});

    const tasks = useTracker(() => {
        if(!userData) {
            return [];
        }

        return TasksCollection.find(
            filter,
            { sort: {createdAt: -1} },
        ).fetch();
    }, [filter]);
    
    return <Outlet context={{
        ...userData, 
        tasksData: tasks, 
        tasksFilter: setFilter}
    } />;
}