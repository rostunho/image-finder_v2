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
