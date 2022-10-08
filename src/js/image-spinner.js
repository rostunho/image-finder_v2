export default class Spinner {
  constructor(selector) {
    this.spinner = selector;
  }

  run() {
    document.querySelector(this.spinner).classList.remove('is-hidden');
  }

  stop() {
    document.querySelector(this.spinner).classList.add('is-hidden');
  }

  stopAll() {
    const spinnersRef = document.querySelectorAll(this.spinner);

    spinnersRef.forEach(spinner => {
      const image = spinner.nextElementSibling.firstElementChild;

      image.addEventListener('load', () => {
        spinner.classList.add('is-hidden');
      });
    });
  }
}
