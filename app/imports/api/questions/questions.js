import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Questions = new Mongo.Collection('Questions');


Meteor.methods({
  //todo only return unanswerd questions
  'Questions.insert'(question) {

    if (!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    console.log('here')

    return Questions.insert(question);
  }
});

/**
 * Create the schema for Questions
 */
export const QuestionSchema = new SimpleSchema({
  question: {
    label: 'Question',
    type: String,
    optional: false,
  },
  answers: {
    label: 'Answer Choices',
    type: [Object],
    minCount: 1,
    maxCount: 5,
  },
  'answers.$': {
    label: 'Hello',
    autoform: {
      afObjectField: {
        label: 'Hello'
      }
    }
  },
  'answers.$.answer': {
    type: String
  },
  'answers.$.reason': {
    type: String
  },
  'answers.$.isCorrect': {
    type: Boolean,
  }
});

Questions.attachSchema(QuestionSchema);
