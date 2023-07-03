import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import User from 'dream-team-v2/models/user';

export default class CatalogService extends Service {
  @tracked storage = {
    users: [],
    leagues: [],
  };

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
            this.addUser(data);
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
    let loggedInUser = new User({
      id: user.id,
      username: 'Deanathan',
      firstName: 'Dean',
      lastName: 'Longmire',
    });

    this.storage.users.push(loggedInUser);
  }

  getUsers() {
    return this.storage.users;
  }
}
