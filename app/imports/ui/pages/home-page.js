import { Template } from 'meteor/templating';
import { QuestionPools } from '../../api/questionPools/questionPools.js';
import { Meteor } from 'meteor/meteor';

Template.Home_Page.onCreated(() => {
  Meteor.subscribe('questionPools');
});

Template.Home_Page.events({
  'click .continue-questions'() {
    console.log('continueing questions')
  },

  'click .generate-questions'() {
    console.log('generating new questions')
    Meteor.call('questionPools.new');
  },
});

Template.Home_Page.helpers({
  loggedIn() {
    return !!Meteor.user()
  },

  hasActiveQuestionPool() {
    var questionPool = QuestionPools.find({}, {
      sort: { timestamp: -1 },
      limit: 1,
    }).fetch();
    
    return questionPool != undefined && questionPool.length > 0 && questionPool[0].currentQuestion < 50;
  },
});
