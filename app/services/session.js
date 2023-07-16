import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class SessionService extends Service {
  @service router;

  isAuthenticated() {
    const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('access-token=')) {
          return 1;
        }
      }
      return 0;
  }

  async invalidate() {
    document.cookie = `access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    this.router.transitionTo('index');
  }
}