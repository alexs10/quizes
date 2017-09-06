import { Template } from 'meteor/templating';
import { QuestionPools } from '../../../api/questionPools/questionPools.js';
import { Meteor } from 'meteor/meteor';

Template.Question_Page.onCreated(() => {
  Meteor.subscribe('questionPools');
});

Template.Question_Page.helpers({
  questions() {
    console.log(QuestionPools.find({}).fetch());
    return QuestionPools.findOne({}).questions;
  },

  questionPoolId() {
    return QuestionPools.findOne({})._id;
  },
});
