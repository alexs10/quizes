import { Questions } from '../../api/questions/questions.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
const questionSeeds = [
  {
    question: 'What is 2 + 2',
    answers: [{
      answer: '4',
      reason: 'duh',
      isCorrect: true
    }, {
      answer: '5',
      reason: 'add a little extra for saftey',
      isCorrect: false
    }, {
      answer: '3',
      reason: 'management said to save costs',
      isCorrect: false
    },],
    answerChoice: -1
  },
  {
    question: 'This is a question',
    answers: [{
      answer: 'some answer',
      reason: 'obviously',
      isCorrect: false
    }, {
      answer: 'the wrong answer',
      reason: 'why would you click this',
      isCorrect: false
    }, {
      answer: 'the correct answer',
      reason: 'it said so',
      isCorrect: true
    }, {
      answer: 'another answer',
      reason: 'its just an answer',
      isCorrect: false
    }],
    answerChoice: -1
  },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
while (Questions.find().count() <= 50) {
  _.each(questionSeeds, (question) => {
    Questions.insert(question);
  });
}
