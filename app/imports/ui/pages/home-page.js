import { Template } from 'meteor/templating';
import { QuestionPools } from '../../api/questionPools/questionPools.js';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Home_Page.onCreated(() => {
  Meteor.subscribe('questionPools');
});

Template.Home_Page.events({
  'click .continue-questions'() {
    console.log('continueing questions')
    var questionPool = QuestionPools.find({}, {
      sort: { timestamp: -1 },
      limit: 1,
    }).fetch();

    if (questionPool.length === 0) {
      return;
    }

    for (let i = 0; i<questionPool[0].questions.length; i++) {
      let currentQuestion = questionPool[0].questions[i];
      console.log('i: ' + i)
      if (currentQuestion.answerChoice === undefined) {
        console.log('going');
        FlowRouter.go(`/quizes/${questionPool[0]._id}/questions/${i+1}`);
        return;
      }
    }
    FlowRouter.go(`/quizes/${questionPool[0]._id}/questions/0`);
  },

  'click .generate-questions'() {
    console.log('generating new questions')
    Meteor.call('questionPools.new', (err, qpid) => {
      if (err) {
        alert(err);
        return;
      }
      FlowRouter.go(`/quizes/${qpid}/questions/1`);
    });
  },
});

Template.Home_Page.helpers({
  loggedIn() {
    return !!Meteor.user()
  },

  currentQuestionIndex() {
    var questionPool = QuestionPools.find({}, {
      sort: { timestamp: -1 },
      limit: 1,
    }).fetch();

    if (questionPool.length === 0) {
      return 0;
    }

    for (let i = 0; i<questionPool.questions.length; i++) {
      let currentQuestion = questionPool.questions[i];
      if (currentQuestion.answerChoice === undefined) {
        return i+1;
      }
    }
    return 0
  },

  hasActiveQuestionPool() {
    var questionPool = QuestionPools.find({}, {
      sort: { timestamp: -1 },
      limit: 1,
    }).fetch();

    return questionPool[0] !== null && !questionPool[0].isDone
  },
});
