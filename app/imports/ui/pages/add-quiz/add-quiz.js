import { AutoForm } from 'meteor/aldeed:autoform';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { Roles } from 'meteor/alanning:roles';


Template.Add_Quiz.helpers({
  isAdmin() {
    return Roles.userIsInRole(Meteor.userId(), 'admin');
  },

  questionsCollection() {
    return Questions;
  },
});

Template.Add_Quiz.events({
  'submit'(event, template) {
    // Prevent default browser form submit
    event.preventDefault();

    const target = event.target;

    console.log(target.checkbox1)

    const question = {
      question: target.question.value,
      answers: [{
        answer: target.answer1.value,
        reason: target.explanation1.value,
        isCorrect: target.checkbox1.checked
      },{
        answer: target.answer2.value,
        reason: target.explanation2.value,
        isCorrect: target.checkbox2.checked
      },{
        answer: target.answer3.value,
        reason: target.explanation3.value,
        isCorrect: target.checkbox3.checked
      },{
        answer: target.answer4.value,
        reason: target.explanation4.value,
        isCorrect: target.checkbox4.checked
      },{
        answer: target.answer5.value,
        reason: target.explanation5.value,
        isCorrect: target.checkbox5.checked
      }]
    };

    Meteor.call('Questions.insert', question)
    template.find('form').reset();
    console.log(question )
    console.log('HERE');
  }
})

Template.Add_Quiz.onRendered(function () {
  var $elem = this.$('.checkbox');

  $elem.checkbox({
    onChange: function () {
      $list = $(this).find('.checkbox');
      console.log('here');
      //submitQuestion($list.filter(".checked").parent().index());
    }
  });

});
