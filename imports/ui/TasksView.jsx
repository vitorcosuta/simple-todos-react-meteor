import { Meteor } from 'meteor/meteor';
import React, { Fragment, useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Task } from "./Task";
import { TaskForm } from "./TaskForm"

export const TasksView = () => {

    const context = useOutletContext();

    const user = context.userData;
    const tasks = context.tasksData;
    const setFilter = context.tasksFilter;

    const logout = () => Meteor.logout();

    const handleDelete = ({ _id }) =>
        Meteor.callAsync('tasks.delete', {_id});

    const handleToggleChecked = ({ _id, isChecked }) =>
        Meteor.callAsync('tasks.toggleChecked', { _id, isChecked });

    /** Implementando o filtro com variáveis de estado */
    const [hideCompleted, setHideCompleted] = useState(false);
    const hideCompletedFilter = { isChecked: { $ne: true } }

    /** Atualizando o filtro */
    useEffect(() => {
        const newFilter = hideCompleted ? hideCompletedFilter : {};
        setFilter(newFilter);
    }, [hideCompleted, setFilter]);

    return (

        <Fragment>
            <div className="user" onClick={logout}>
                {user.username} 🚪
            </div>
            <TaskForm />

            <div className="filter">
                <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? 'Show All' : 'Hide Completed'}
                </button>
            </div>

            <ul className="tasks">
                {tasks.map(task => (
                <Task
                    key={task._id}
                    task={task}
                    onCheckboxClick={handleToggleChecked}
                    onDeleteClick={handleDelete}
                />
                ))}
            </ul>
        </Fragment>
    )

}