// app/components/share-button.js
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class NavBehavior extends Component {
  @tracked navbarHidden = false;
  @service session;
  @service router;
  prevScrollPos = window.pageYOffset;

  constructor() {
    super(...arguments);
    window.addEventListener('scroll', this.handleScroll);
  }

  willDestroy() {
    super.willDestroy(...arguments);
    window.removeEventListener('scroll', this.handleScroll);
  }

  @action
  handleScroll() {
    const currentScrollPos = window.pageYOffset;
    const navbar = document.querySelector('.navbar');

    if (this.prevScrollPos > currentScrollPos) {
      this.navbarHidden = false;
      navbar.classList.remove('hidden');
    } else {
      this.navbarHidden = true;
      navbar.classList.add('hidden');
    }

    this.prevScrollPos = currentScrollPos;
  }

  @action
  logout() {
    this.session.invalidate();
  }

  get isAuthenticated() {
    const currentRouteName = this.router.currentRouteName; //need this for bar to change live
    if(this.session.isAuthenticated()) {
      return true;
    }
    else {
      return false;
    }
  }
}
