import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.publish("tasks", function () {
  
    if (!this.userId) {
        return this.ready();
    }

    return TasksCollection.find();
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