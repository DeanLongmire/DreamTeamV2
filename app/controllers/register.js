import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RegisterController extends Controller {
    @service router;

    @action
    loginClick() {
        fetch("http://localhost:5000/users/register", {
            method: 'POST',
        })
        .then(response => {
            if(response.ok)
            {
                console.log("Connected!");
                this.router.transitionTo('team-home');
            }   
        });
    }
}