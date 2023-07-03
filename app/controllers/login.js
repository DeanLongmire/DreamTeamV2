import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
  @service router;
  @service catalog;
  @service session;

  @tracked errorMessage = '';
  @tracked error;
  @tracked credentials = {
    email: '',
    password: '',
  };

  @action
  async loginClick() {
    try {
      await this.session.authenticate('authenticator:token', this.credentials);
    } catch (error) {
      this.error = error;
    }
  }
}
