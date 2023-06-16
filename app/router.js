import EmberRouter from '@ember/routing/router';
import config from 'dream-team-v2/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('register');
  this.route('user', { path: ':id' }, function () {
    this.route('leagues', function () {
      this.route('league', { path: ':id' }, function () {
        this.route('teams', function () {
          this.route('team', { path: ':id' });
        });
      });
    });
  });
  this.route('connection-refused');
});
