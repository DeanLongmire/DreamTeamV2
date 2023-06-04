import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
    @service router;
    @tracked credentials = {
        email: "",
        password: ""
    }

    @action
    loginClick() {
        fetch("http://localhost:5000/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.credentials)
        })
        .then(response => {
            if(response.ok)
            {
                console.log("Connected!");
                this.router.transitionTo('team-home');
            }
            else if(response.status == 404)
            {
                this.router.transitionTo('404');
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