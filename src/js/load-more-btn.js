export default class LoadMoreBtn {
  constructor(buttonSelector) {
    this.buttonRef = document.querySelector(buttonSelector);
  }

  show() {
    this.buttonRef.classList.remove('is-hidden');
  }

  hide() {
    this.buttonRef.classList.add('is-hidden');
  }

  loading() {
    this.buttonRef.children[0].classList.remove('is-hidden');
    this.buttonRef.children[1].textContent = 'loading';
    this.buttonRef.disabled = true;
  }

  loaded() {
    this.buttonRef.children[0].classList.add('is-hidden');
    this.buttonRef.children[1].textContent = 'Load more';
    this.buttonRef.disabled = false;
  }
}
