import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

/* When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  let id = Accounts.createUser({
    username: "admin",
    email: "admin@test.com",
    profile: {
      firstName: 'admin'
    },
    password: "password"
  });

  Roles.addUsersToRoles(id, 'admin');

};
