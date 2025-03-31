import React from "react"
import { Routes, Route } from "react-router-dom"
import { TasksView } from "../pages/Tasks/TasksView"
import { TasksDashboard } from "../pages/Tasks/TasksDashboard"
import { TasksEdit } from "../pages/Tasks/TasksEdit";

export const TasksRoutes = () => {

    return (
        <Routes>
            <Route path='view' element={<TasksView />} />
            <Route path='dashboard' element={<TasksDashboard />} />
            <Route path='edit/:id' element={<TasksEdit />} />
        </Routes>
    )
}