import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
  });

  AccountsTemplates.addField({
    _id: 'first',
    type: 'text',
    displayName: "First Name"
  });

  AccountsTemplates.addField({
    _id: 'last',
    type: 'text',
    displayName: "Last Name"
  });

  AccountsTemplates.configure({
    onSubmitHook: function(error, state) {
      FlowRouter.go("/");
    }
  })
}
