import Base from 'ember-simple-auth/authenticators/base';
import { inject as service } from '@ember/service';

export default class CustomAuthenticator extends Base {
  @service router;
  @service session;

  restore(data) {}

  async authenticate(userData) {
    console.log('Authenticate');
    let response = await fetch('http://localhost:5000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      response.json().then((data) => {
        const { token } = data;
        this.session.set('token', token);
        this.router.transitionTo('user', data.id);
      });
    } else {
      let error = await response.text();
      throw new Error(error);
    }
  }

  invalidate() {
    return new Promise((resolve, reject) => {
      // Perform any necessary cleanup or remote request to invalidate the token
      // Once the token is invalidated, resolve the promise
      // If an error occurs, reject the promise with the error object
      resolve();
    });
  }
}
