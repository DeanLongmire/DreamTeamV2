import Model from '@ember-data/model';

export class User {
  constructor({ id, username, firstName, lastName }) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

export default class UserModel extends Model {}
