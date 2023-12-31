export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);
    hidden && this.hide();
  }
  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector('.button');
    refs.label = document.querySelector('.label');
    refs.spinner = document.querySelector('.spinner');
    return refs;
  }
  enable() {
    this.refs.button.disabled = false;
    this.refs.label.textContent = 'Load More';
    this.refs.spinner.classList.add('is-hidden');
  }
  disabled() {
    this.refs.button.disabled = true;
    this.refs.label.textContent = 'Loading...';
    this.refs.spinner.classList.remove('is-hidden');
  }
  show() {
    this.refs.button.classList.remove('is-hidden');
  }
  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}
