import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Questions = new Mongo.Collection('Questions');

/**
 * Create the schema for Questions
 */
export const QuestionSchema = new SimpleSchema({
  question: {
    label: 'Question',
    type: String,
    optional: false,
    max: 20,
    autoform: {
      group: 'Question',
      placeholder: 'How',
    },
  },
  answers: {
    label: 'Answer Choices',
    type: [Object],
    minCount: 1,
    maxCount: 5,
    autoform: {
      group: 'Answer Choices'
    },
  },
  'answers.$.answer': {
    type: String
  },
  'answers.$.reason': {
    type: String
  },
  'answers.$.isCorrect': {
    type: Boolean,
  },
  answerChoice: {
    type: Number
  }
});

Questions.attachSchema(QuestionSchema);
