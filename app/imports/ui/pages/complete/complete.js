import { Template } from 'meteor/templating';
import { QuestionPools } from '../../../api/questionPools/questionPools.js';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Complete.helpers({
  isQuizComplete() {
    for (let i = 0; i<this.questions.length; i++) {
      let currentQuestion = this.questions[i];
      if (currentQuestion.answerChoice === undefined) {
        return false;
      }
    }
    return true
  },

  amountCorrect() {
    let amountCorrect = 0;
    for (let i = 0; i<this.questions.length; i++) {
      let currentQuestion = this.questions[i];
      if (currentQuestion.answerChoice !== undefined && currentQuestion.answers[currentQuestion.answerChoice].isCorrect) {
        amountCorrect++
      }
    }
    return amountCorrect;
  },

  questionCount() {
    return this.questions.length;
  }
});

Template.Complete.events({
  'click .ui.button.review'(event) {
    console.log('event')
    FlowRouter.go(`/quizes/${FlowRouter.getParam('questionPoolId')}/review/1`);
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
