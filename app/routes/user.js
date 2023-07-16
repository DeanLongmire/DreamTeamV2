import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UserRoute extends Route {
  @service catalog;
  @service session;
  @service router;

  beforeModel(transition) {
    this.session.checkAuthentication()
    .then(() => {
      return;
    })
    .catch(() => {
      this.router.transitionTo('login');
    })
  }

  async model() {
    let users = await this.catalog.getUsers();

    console.log(users);

    return { users };
  }
}
