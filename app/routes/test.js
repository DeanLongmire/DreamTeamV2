import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default class UserRoute extends Route {
  @service catalog;
  @service session;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  async model() {
    let users = await this.catalog.getUsers();

    console.log(users);

    return { users };
  }
}
