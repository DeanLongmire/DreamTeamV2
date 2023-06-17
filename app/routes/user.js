import Route from '@ember/routing/route';

export default class UserRoute extends Route {
  model() {
    let user = {
      name: 'Dean'
    };

    return user;
  }
}
