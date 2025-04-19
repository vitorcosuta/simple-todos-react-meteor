import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.publish("tasks", function ({
    page = 1,
    pageSize = 4,
    hideCompleted = false,
    searchTerm = ''
}) {
  
    if (!this.userId) {
        return this.ready();
    }

    const regex = new RegExp(searchTerm, 'i');

    const filter = {
        ...(hideCompleted ? { status: { $ne: 'Concluída' } } : {}),
        ...(searchTerm ? { name: { $regex: regex } } : {}),
        $or: [
            { userId: this.userId },      // Tarefas do usuário atual
            { isPersonal: false }         // Tarefas públicas
        ]
    };

    const skip = (page - 1) * pageSize;

    const options = {
        sort: { createdAt: -1 },
        skip: skip,
        limit: pageSize
    };

    return TasksCollection.find(filter, options);
});

Meteor.publish("pendingTasks", function ({
    page = 1,
    pageSize = 4,
    hideCompleted = false,
}) {

    const filter = {
        ...(hideCompleted ? { status: { $ne: 'Concluída' } } : {}),
        $or: [
            { userId: this.userId },      // Tarefas do usuário atual
            { isPersonal: false }          // Tarefas públicas
        ]
    };

    const skip = (page - 1) * pageSize;

    const options = {
        sort: { createdAt: -1 },
        skip: skip,
        limit: pageSize
    };

    return TasksCollection.find(filter, options);
});