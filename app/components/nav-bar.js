// app/components/share-button.js
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class NavBehavior extends Component {
  @tracked navbarHidden = false;
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

  @service router;

  get checkPage() {
    const currentRouteName = this.router.currentRouteName;
    console.log(currentRouteName);
    return currentRouteName === 'index' || currentRouteName === 'login' || currentRouteName === 'register' || currentRouteName === 'connection-refused';
  }
}
