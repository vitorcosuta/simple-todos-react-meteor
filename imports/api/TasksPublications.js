import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.publish("tasks", function () {
  
  const userId = this.userId;

  if (!userId) {
    return this.ready();
  }

  return TasksCollection.find({ userId });
});

Meteor.publish("pendingTasks", function (hideCompleted) {

  const filter = hideCompleted ? { status: { $ne: 'Concluída' } } : {};

  return TasksCollection.find(filter);
});