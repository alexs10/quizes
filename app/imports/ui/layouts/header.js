import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Template.Header.helpers({
  isAdmin() {
    return Roles.userIsInRole(Meteor.userId(), 'admin');
  }
})
// The Header menu does not use dropdown menus, but most menus do.
// Here's how to do the required initialization for Semantic UI dropdown menus.
Template.Header.onRendered(function enableDropDown() {
  this.$('.dropdown').dropdown();
});
