import Route from '@ember/routing/route';

export class User {
  constructor({ id, username, firstName, lastName }) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

export default class UserRoute extends Route {
  model() {
    let Deanathan = new User({
      id: '12345',
      username: 'Deanathan',
      firstName: 'Dean',
      lastName: 'Longmire',
    });

    return [Deanathan];
  }
}
