import { Meteor } from 'meteor/meteor';

Meteor.publish('allUsers', function () {

    return Meteor.users.find({}, { fields: { profile: 1 } });
});