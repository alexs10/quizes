import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Questions } from '../questions/questions.js'
import { check } from 'meteor/check';
import { _ } from 'lodash';

export const QuestionPools = new Mongo.Collection('questionPools');

Meteor.methods({
  //todo only return unanswerd questions
  'questionPools.new'() {

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    //todo only 50
    let questions = Questions.find({}).fetch();

    console.log("BAMF")
    console.log(questions);


    QuestionPools.insert({
      questions,
      timestamp: new Date(),
      owner: Meteor.userId(),
      currentQuestion: 0
    });

    console.log("BAMF 2")
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

  }
})

if (Meteor.isServer) {
  Meteor.publish('questionPools', function tasksPublication() {
    return QuestionPools.find({ owner: this.userId }, { sort: { timestamp: -1 }});
  });
}
