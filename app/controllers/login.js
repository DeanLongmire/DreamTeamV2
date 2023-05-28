import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class LoginController extends Controller {
    @action
    loginClick() {
        fetch("http://localhost:5000/users/login", {
            method: 'GET',
        })
        .then(response => {
            if(response.ok)
            {
                console.log("Connected!");
            }   
        });
    }
}