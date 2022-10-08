export default class LoadMoreBtn {
  constructor(buttonRef, spinnerRef) {
    this.button = buttonRef;
    this.spinner = spinnerRef;
  }

  show() {
    this.button.classList.remove('is-hidden');
  }

  hide() {
    this.button.classList.add('is-hidden');
  }

  loading() {
    this.spinner.classList.remove('is-hidden');
    this.button.children[1].textContent = 'loading';
    this.button.disabled = true;
  }

  loaded() {
    this.spinner.classList.add('is-hidden');
    this.button.children[1].textContent = 'Load more';
    this.button.disabled = false;
  }
}

// const refs = {
//   loadMoreBtn: document.querySelector('.load-more'),
//   smallSpinner: document.querySelector('.spinner-small'),
// };

// function buttonActive() {
//   refs.loadMoreBtn.classList.remove('is-hidden');
// }

// function loading() {
//   refs.smallSpinner.classList.remove('is-hidden');
//   refs.loadMoreBtn.children[1].textContent = 'loading';
//   refs.loadMoreBtn.disabled = true;
// }

// function loaded() {
//   refs.smallSpinner.classList.add('is-hidden');
//   refs.loadMoreBtn.children[1].textContent = 'Load more';
//   refs.loadMoreBtn.disabled = false;
// }
