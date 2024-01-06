import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UserRoute extends Route {
  baseUrl = this.store.adapterFor('application').namespace;

  @service catalog;
  @service session;
  @service router;
  @service store;

  beforeModel(transition) {
    if(!this.session.isAuthenticated()) {
      this.router.transitionTo('login');
    }
  }

  // Remember, the model must return a promise
  model() {
    return new Promise((resolve, reject) => {
      let userId;

      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('access-token=')) {
          const brokenCookie = cookie.split('=');
          userId = brokenCookie[1];
        }
      }

      fetch(`${this.baseUrl}/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              this.store.createRecord('user', {
                id: 1,
                username: data.email,
                firstname: 'Dean',
                lastname: 'Longmire',
              });
              const userLoggedIn = this.store.peekRecord('user', 1);
              resolve({ userLoggedIn });
            });
          } else {
            reject(new Error(`Failed to fetch user data. Status: ${response.status}`));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
