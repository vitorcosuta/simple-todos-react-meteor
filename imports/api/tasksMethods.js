import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

const INITIAL_TASK_STATUS = 'Cadastrada';

Meteor.methods({
  "tasks.insert"(doc) {
    return TasksCollection.insertAsync({
      ...doc,
      userId: this.userId,
      status: INITIAL_TASK_STATUS,
    });
  },
  "tasks.changeStatus"({ _id, status }) {
    return TasksCollection.updateAsync(_id, {
      $set: { status },
    });
  },
  "tasks.delete"({ _id }) {
    return TasksCollection.removeAsync(_id);
  },
  "tasks.update"({ _id, newText, newDescription, newDate }) {
    return TasksCollection.updateAsync(_id, {
      $set: { 
        text: newText,
        description: newDescription,
        date: newDate,
      }
    });
  },
});