import React from "react"
import { useSubscribe } from "meteor/react-meteor-data";
import { Routes, Route } from "react-router-dom"
import { TasksView } from "../pages/Tasks/TasksView"
import { TasksDashboard } from "../pages/Tasks/TasksDashboard"

export const TasksRoutes = () => {

    const areTasksLoading = useSubscribe("tasks");

    return (
        <Routes>
            <Route path='view' element={<TasksView />} />
            <Route path='dashboard' element={<TasksDashboard />} />
        </Routes>
    )
}