import Service from '@ember/service';

export default class SessionService extends Service {
  checkAuthentication() {
    return new Promise((resolve,reject) => {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('access-token=')) {
          console.log("Found access token");
          resolve();
          return;
        }
      }
      console.log("Could not find access-token");
      reject();
      return;
    })
  }
  
  isAuthenticated() {
    const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('access-token=')) {
          return 1;
        }
      }
      return 0;
  }
}