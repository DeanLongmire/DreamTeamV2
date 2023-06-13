import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
    @service router;
    @tracked errorMessage = "";
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
                response.json().then(data => {
                    console.log("Connected!");
                    this.router.transitionTo('user', data.id);
                })
            }
            else if(response.status == 401)
            {
                this.errorMessage = "*Wrong Email or Password*";
            }     
        })
        .catch((error) => {
            console.error('Error:', error);
            this.router.transitionTo('connection-refused');
        });
    }
}