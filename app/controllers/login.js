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
                console.log("Connected!");
                this.router.transitionTo('user-teams');
            }
            else if(response.status == 400)
            {
                this.errorMessage = "*Email Not Found*";
            }
            else if(response.status == 401)
            {
                this.errorMessage = "*Wrong Password*";
            }     
        })
        .catch((error) => {
            console.error('Error:', error);
            this.router.transitionTo('connection-refused');
        });
    }
}