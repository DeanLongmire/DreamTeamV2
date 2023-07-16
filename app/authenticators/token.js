import Base from 'ember-simple-auth/authenticators/base';
import { inject as service } from '@ember/service';
// import { getJSONCookie } from 'ember-simple-auth/session-stores/cookie';

function getCookieValue(cookieName) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + '=')) {
      return cookie;
    }
  }
  return null;
}

export default class CustomAuthenticator extends Base {
  @service router;
  @service session;

  restore(data) {
    console.log('Restore');
    console.log("Data " + data);
    let { token } = data;

    if(token) {
      return data;
    }
    else {
      throw 'no valid session data';
    }
  }

  async authenticate(userData) {
    let response = await fetch('http://localhost:5000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if(response.ok) {
      response.json().then((data) => {
        const { token } = data;
        this.session.set("data.authenticated.token",token)
        console.log(this.session);
        this.router.transitionTo('user', data.id);
      });
    } 
    else {
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
