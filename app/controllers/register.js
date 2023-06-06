import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class RegisterController extends Controller {
    @service router;
    @tracked credentials = {
        email: "",
        password: ""
    };

    @action
    loginClick() {
        fetch("http://localhost:5000/users/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.credentials)
        })
        .then(response => {
            if(response.ok)
            {
                console.log("Account Created!");
                this.router.transitionTo('user-teams');
            }   
        })
        .catch((error) => {
            console.error('Error:', error);
            this.router.transitionTo('connection-refused');
        });
    }

    @action
    updateEmail(event) {
        this.credentials.email = event.target.value;
    }

    @action
    updatePassword(event) {
        this.credentials.password = event.target.value;
    }
}