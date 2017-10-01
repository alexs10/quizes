import { Template } from 'meteor/templating';
import { QuestionPools } from '../../../api/questionPools/questionPools.js';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';


Template.Quiz_Page.onCreated(() => {
  Meteor.subscribe('questionPools');
});

Template.Quiz_Page.helpers({
  questionPool() {
    return QuestionPools.findOne({ _id: FlowRouter.getParam('questionPoolId')});
  },

  question() {
    console.log("hello" + FlowRouter.getParam('questionNumber'))
    return QuestionPools.findOne({ _id: FlowRouter.getParam('questionPoolId')}).questions[FlowRouter.getParam('questionNumber') - 1];
  },

  questions() {
    console.log(QuestionPools.find({}).fetch());
    return QuestionPools.findOne({ _id: FlowRouter.getParam('questionPoolId')}).questions;
  },

  questionPoolId() {
    return FlowRouter.getParam('questionPoolId');
  },

  hasNext() {
    console.log( QuestionPools.findOne({}).questions.length);
    return FlowRouter.getParam('questionNumber') < QuestionPools.findOne({ _id: FlowRouter.getParam('questionPoolId')}).questions.length - 1;
  },

  hasPrevious() {
    return FlowRouter.getParam('questionNumber') > 1;
  },

  isDone() {
    return QuestionPools.findOne({ _id: FlowRouter.getParam('questionPoolId')}).isDone;
  },
});

Template.Quiz_Page.events({
  'click .ui.button.next'(event) {
    console.log('event')
    FlowRouter.setParams({questionNumber: parseInt(FlowRouter.getParam('questionNumber')) + 1})
  },

  'click .ui.button.back'(event) {
    console.log('event')
    FlowRouter.setParams({questionNumber: parseInt(FlowRouter.getParam('questionNumber')) - 1})
  },

  'click .ui.button.finish'(event) {
    console.log('event')
    Meteor.call('questionPools.finish', FlowRouter.getParam('questionPoolId'));
  }
})
