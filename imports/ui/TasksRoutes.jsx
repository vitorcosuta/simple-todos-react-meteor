import React from "react"
import { Routes, Route } from "react-router-dom"
import { TasksView } from "./TasksView"
import { TasksLayout } from "./TasksLayout"

export const TasksRoutes = () => {
    return (
        <Routes>
            <Route element={<TasksLayout />}>
                <Route path='view' element={<TasksView />} />
            </Route>
        </Routes>
    )
}