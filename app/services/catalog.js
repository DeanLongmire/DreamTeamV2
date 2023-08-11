import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class CatalogService extends Service {
  @service store;
  @tracked storage = {
    users: [],
    leagues: []
  }

  constructor() {
    super(...arguments);
    this.loadFromLocalStorage();
  }

  async fetchUserLogin(userData, callback) {
    fetch('http://localhost:5000/users/login', {
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
            let { token } = data;
            document.cookie = `access-token=${token}`;
            this.addUser(data);
            this.saveToLocalStorage();
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

  addUser(user) {
    let loggedInUser = this.store.createRecord('user', {
      id: user.id,
      username: 'Deanathan',
      firstName: 'Dean',
      lastName: 'Longmire',
    });

    console.log(loggedInUser);

    this.storage.users.push(loggedInUser);
  }

  getUsers() {
    return Promise.resolve(this.storage.users);
  }

  saveToLocalStorage() {
    console.log(this.storage.users);
    localStorage.setItem('catalogStorage', JSON.stringify(this.storage.users[0]));
  }

  // Load data from localStorage
  loadFromLocalStorage() {
    const savedData = localStorage.getItem('catalogStorage');
    if (savedData) {
      this.storage = JSON.parse(savedData);
    }
  }
}
