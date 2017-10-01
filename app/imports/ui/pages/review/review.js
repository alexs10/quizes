import { Template } from 'meteor/templating';
import { QuestionPools } from '../../../api/questionPools/questionPools.js';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';


Template.Review_Page.onCreated(() => {
  Meteor.subscribe('questionPools');
});

Template.Review_Page.helpers({
  question() {
    console.log("hello" + FlowRouter.getParam('questionNumber'))
    return QuestionPools.findOne({}).questions[FlowRouter.getParam('questionNumber')];
  },

  questions() {
    console.log(QuestionPools.find({}).fetch());
    return QuestionPools.findOne({}).questions;
  },

  questionPoolId() {
    return QuestionPools.findOne({})._id;
  },

  hasNext() {
    console.log( QuestionPools.findOne({}).questions.length);
    return FlowRouter.getParam('questionNumber') < QuestionPools.findOne({ _id: FlowRouter.getParam('questionPoolId')}).questions.length - 1;
  },

  hasPrevious() {
    return FlowRouter.getParam('questionNumber') > 1;
  },
});

Template.Review_Page.events({
  'click .ui.button.next'(event) {
    console.log('event')
    FlowRouter.setParams({questionNumber: parseInt(FlowRouter.getParam('questionNumber')) + 1})
  },

  'click .ui.button.back'(event) {
    console.log('event')
    FlowRouter.setParams({questionNumber: parseInt(FlowRouter.getParam('questionNumber')) - 1})
  },

  'click .ui.button.new'(event) {
    console.log('event')
    Meteor.call('questionPools.new', (err, qpid) => {
      if (err) {
        alert(err);
        return;
      }
      FlowRouter.go(`/quizes/${qpid}/questions/1`);
    });
  }
})
