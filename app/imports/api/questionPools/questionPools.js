import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Questions } from '../questions/questions.js'
import { check } from 'meteor/check';
import { _ } from 'lodash';

export const QuestionPools = new Mongo.Collection('questionPools');
 const QuestionPoolTime = 20000; //ms

Meteor.methods({
  //todo only return unanswerd questions
  'questionPools.new'() {

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    let questionCount = Math.floor(Math.random() * (2)) + 24;
    let allQuestions = Questions.find({}).fetch();

    let questions = _.sampleSize(allQuestions, questionCount);

    console.log("BAMF")
    console.log(questions);

    const questionPoolId = QuestionPools.insert({
      questions,
      timestamp: new Date(),
      owner: Meteor.userId(),
      currentQuestion: 0,
      isDone: false
    });

    console.log("BAMF 2")
    Meteor.setTimeout(() => {
      console.log('question pool time over');
        QuestionPools.update(questionPoolId, {
          $set: { isDone: true }
        });
    }, 1*60*1000);

    return questionPoolId;
  },

  'questionPools.answer'(questionPoolId, questionId, answerIndex) {
    check(questionPoolId, String);
    check(questionId, String);
    check(answerIndex, Match.Integer);

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    QuestionPools.update({
      "_id": questionPoolId,
      "questions._id": questionId,
    }, {
      $set: {
        "questions.$.answerChoice": answerIndex
      }
    })

    console.log("updated question");
  },

  'questionPools.finish'(questionPoolId) {
    check(questionPoolId, String);

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    QuestionPools.update(questionPoolId, {
      $set: { isDone: true }
    });
  }
})

if (Meteor.isServer) {
  Meteor.publish('questionPools', function tasksPublication() {
    return QuestionPools.find({ owner: this.userId }, { sort: { timestamp: -1 }});
  });
}
