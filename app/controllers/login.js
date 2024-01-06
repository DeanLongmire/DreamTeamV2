import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
  @service router;
  @service catalog;

  @tracked errorMessage = '';
  @tracked error;
  @tracked credentials = {
    email: '',
    password: '',
  };

  @action
  async loginClick() {
    await this.catalog.fetchUserLogin(this.credentials, (status, data) => {
      if (status === 'valid') {
        this.router.transitionTo('user', data.id);
      } else if (status === 'invalid') {
        this.errorMessage = '*Wrong Email or Password*';
      } else {
        this.router.transitionTo('connection-refused');
      }
    });
  }
}
