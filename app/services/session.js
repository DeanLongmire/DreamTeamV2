import Service from '@ember/service';

export default class SessionService extends Service {
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