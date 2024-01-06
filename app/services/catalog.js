import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class CatalogService extends Service {
  baseUrl = this.store.adapterFor('application').namespace;

  @service store;
  @tracked storage = {
    users: [],
    leagues: []
  }

  constructor() {
    super(...arguments);
  } 

  async fetchUserLogin(userData, callback) {
    fetch(`${this.baseUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log('Connected!');
            let { id } = data;
            document.cookie = `access-token=${id}`;
            callback('valid', data);
          });
        } else if (response.status == 401) {
          callback('invalid');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        callback('error');
      });
  }
}
