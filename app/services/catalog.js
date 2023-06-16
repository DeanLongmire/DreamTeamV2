import Service from '@ember/service';

export default class CatalogService extends Service {
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
}
