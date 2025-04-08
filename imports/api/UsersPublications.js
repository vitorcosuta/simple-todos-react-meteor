import { Meteor } from "meteor/meteor";

Meteor.publish("currentUser", function () {
    if (!this.userId) return this.ready();
  
    return Meteor.users.find(
      { _id: this.userId },
      {
        fields: {
          'profile.name': 1,
          'profile.gender': 1,
          'profile.company': 1,
          'profile.birthdate': 1,
          'profile.photo': 1,
          emails: 1 // opcional, caso você precise do e-mail no client
        }
      }
    );
});