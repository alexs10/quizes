import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { _ } from 'lodash';

Template.Question_Review.helpers({
  isCorrect(answer) {
    return this.isCorrect ? 'positive' : 'negative';
  },

  reasonIcon() {
    return this.isCorrect ? 'checkmark' : 'remove';
  },

  isChecked() {
    if (this.question.answerChoice === undefined) {
      return '';
    }
    if (this.question.answers[this.question.answerChoice].answer === this.answer) {
      return 'checked';
    }
  },

  loadChecked() {
    if (this.question.answerChoice === undefined) {
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

Template.Question_Review.events({
  'click .ui.checkbox.input-ready'(event) {
    console.log('event')
    let index = _.findIndex(this.question.answers, (answer) => {
      return answer.answer === this.answer;
    })

    Meteor.call('questionPools.answer', this.qpid, this.question._id, index)
  }
})

Template.Question_Review.onRendered(function () {
  var $elem = this.$('.checkbox');

  context = this.data;

  $elem.checkbox({
    onChange: function () {
      //$elem.addClass('disabled');

      $list = $(this).closest('.grouped').find('.checkbox');

      //submitQuestion($list.filter(".checked").parent().index());
    }
  });

});
