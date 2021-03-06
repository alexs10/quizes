import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  name: 'Home_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Home_Page' });
  },
});

FlowRouter.route('/login', {
  name: 'Login_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Login_Page' });
  },
});

FlowRouter.route('/signup', {
  name: 'Sign_Up_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Sign_Up_Page' });
  },
});

FlowRouter.route('/sign-out', {
  action: function() {
    AccountsTemplates.logout();
    FlowRouter.go("/");
  }
});

FlowRouter.route('/quizes/:questionPoolId/questions/:questionNumber', {
  name: 'Quiz_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Quiz_Page' });
  }
});

FlowRouter.route('/quizes/:questionPoolId/review/:questionNumber', {
  name: 'Review_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Review_Page' });
  }
});

FlowRouter.route('/list', {
  name: 'List_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'List_Stuff_Page' });
  },
});

FlowRouter.route('/add', {
  name: 'Add_Quiz',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Quiz' });
  },
});

FlowRouter.route('/stuff/:_id', {
  name: 'Edit_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Stuff_Page' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};
