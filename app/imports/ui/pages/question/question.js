import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { _ } from 'lodash';

Template.Question.helpers({
  isAnswered() {
    return this.question.answerChoice != -1;
  },

  isCorrect(answer) {
    return this.isCorrect ? 'positive' : 'negative';
  },

  reasonIcon() {
    return this.isCorrect ? 'checkmark' : 'remove';
  },

  isDisabled() {
    if (this.question.answerChoice != -1) {
      return 'disabled';
    } else return 'input-ready'
  },

  isChecked() {
    if (this.question.answerChoice === -1) {
      return '';
    }
    if (this.question.answers[this.question.answerChoice].answer === this.answer) {
      return 'checked';
    }
  },

  loadChecked() {
    if (this.question.answerChoice === -1) {
      return '';
    }
    if (this.question.answers[this.question.answerChoice].answer === this.answer) {
      return 'checked disabled';
    } else {
      return 'disabled';
    }
  },

  augmentedAnswers() {
    return _.map(this.question.answers, (answer) => {
      return {
        answer: answer.answer,
        isCorrect: answer.isCorrect,
        reason: answer.reason,
        question: this.question,
        qpid: this.qpid
      };
    })
  }
});

Template.Question.events({
  'click .ui.checkbox.input-ready'(event) {
    console.log('event')
    let index = _.findIndex(this.question.answers, (answer) => {
      return answer.answer === this.answer;
    })

    Meteor.call('questionPools.answer', this.qpid, this.question._id, index)
  }
})

let context;

function submitQuestion(answerChoice) {
  console.log(context)
  console.log("submitting question: " + answerChoice);
  console.log("qpid: " + context.qpid );
  console.log("question: " + context.question._id );


}

Template.Question.onRendered(function () {
  var $elem = this.$('.checkbox');

  context = this.data;

  $elem.checkbox({
    onChange: function () {
      $elem.addClass('disabled');

      $list = $(this).closest('.grouped').find('.checkbox');

      //submitQuestion($list.filter(".checked").parent().index());
    }
  });

});
