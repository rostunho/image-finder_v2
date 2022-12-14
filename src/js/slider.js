import sliderContainerTmp from '../templates/slider-container.hbs';
import sliderImageTmp from '../templates/slider-image.hbs';

let mainDOMElement = null;
let leftDOMElement = null;
let rightDOMElement = null;

let mainImage = null;
let leftImage = null;
let rightImage = null;

let leftButtonRef = null;
let rightButtonRef = null;
let closeButtonRef = null;
let backdropRef = null;

export function runSlider() {
  const cards = document.querySelectorAll('.photo-card');

  cards.forEach(card => {
    card.addEventListener('click', sliderHandler);
  });
}

function sliderHandler(event) {
  renderSliderContainer('.slider');
  setDOMElements(event);
  renderImages();
  activateSliderButtons();
  document.body.style.overflow = 'hidden';
}

function renderSliderContainer(sliderSelector) {
  document.querySelector(sliderSelector).innerHTML = sliderContainerTmp();
  document.querySelector(sliderSelector).classList.remove('is-hidden');
}

function setDOMElements(event) {
  mainDOMElement = event.currentTarget;
  console.log(mainDOMElement);

  if (mainDOMElement.previousElementSibling) {
    leftDOMElement = mainDOMElement.previousElementSibling;
    console.log(leftDOMElement);
  }

  if (mainDOMElement.nextElementSibling) {
    rightDOMElement = mainDOMElement.nextElementSibling;
    console.log(rightDOMElement);
  }
}

function renderImages() {
  renderMainImage(mainDOMElement);

  if (leftDOMElement) {
    renderLeftImage(leftDOMElement);
  }
  if (rightDOMElement) {
    renderRightImage(rightDOMElement);
  }
}

function renderMainImage(DOMElement) {
  mainImage = {
    source: DOMElement.children[1].firstElementChild.dataset.source,
    subClass: 'slider__image--main',
    alt: DOMElement.children[1].firstElementChild.dataset.alt,
    translateX: 0,
    zIndex: 150,
    opacity: 1,
  };

  const innerContainer = document.querySelector('.slider__image-container');
  const markup = sliderImageTmp(mainImage);
  innerContainer.insertAdjacentHTML('beforeend', markup);
}

function renderLeftImage(DOMElement) {
  if (!DOMElement) {
    console.log('There is first Picture');
    return;
  }

  leftImage = {
    source: DOMElement.children[1].firstElementChild.dataset.source,
    subClass: 'slider__image--left',
    alt: DOMElement.children[1].firstElementChild.dataset.alt,
    translateX: '-200%',
    zIndex: 140,
    opacity: 0,
  };

  const innerContainer = document.querySelector('.slider__image-container');
  const markup = sliderImageTmp(leftImage);
  innerContainer.insertAdjacentHTML('afterbegin', markup);
}

function renderRightImage(DOMElement) {
  if (DOMElement === null) {
    console.log('There is last one Picture');
    return;
  }

  rightImage = {
    source: DOMElement.children[1].firstElementChild.dataset.source,
    subClass: 'slider__image--right',
    alt: DOMElement.children[1].firstElementChild.dataset.alt,
    translateX: '200%',
    zIndex: 145,
    opacity: 0,
  };

  const innerContainer = document.querySelector('.slider__image-container');
  const markup = sliderImageTmp(rightImage);
  innerContainer.insertAdjacentHTML('beforeend', markup);
}

function activateSliderButtons() {
  leftButtonRef = document.querySelector('.slider__button--left');
  rightButtonRef = document.querySelector('.slider__button--right');
  closeButtonRef = document.querySelector('.slider__button--close');
  backdropRef = document.querySelector('.slider__image-container');

  if (!leftDOMElement) {
    leftButtonRef.disabled = true;
  }
  if (!rightDOMElement) {
    rightButtonRef.disabled = true;
  }

  leftButtonRef.addEventListener('click', moveSliderToLeft);
  rightButtonRef.addEventListener('click', moveSliderToRight);
  closeButtonRef.addEventListener('click', stopSlider);
  document.body.addEventListener('keydown', onEscPress);
  document.body.addEventListener('keydown', onErrowsPress);
  backdropRef.addEventListener('click', onBackdropClick);
}

function moveSliderToLeft() {
  const mainCardRef = document.querySelector('.slider__image--main');
  const leftCardRef = document.querySelector('.slider__image--left');
  const rightCardRef = document.querySelector('.slider__image--right');

  if (rightCardRef) {
    rightCardRef.style.transform = 'translateX(400%)';
    rightCardRef.style.opacity = 0;
  }

  mainCardRef.style.transform = 'translateX(200%)';
  mainCardRef.style.opacity = 0;
  leftCardRef.style.transform = 'translateX(0)';
  leftCardRef.style.opacity = 1;

  if (rightCardRef) {
    rightCardRef.parentNode.remove();
  }

  mainDOMElement = leftDOMElement;
  leftDOMElement = mainDOMElement.previousElementSibling;
  rightDOMElement = mainDOMElement.nextElementSibling;

  mainCardRef.classList.remove('slider__image--main');
  mainCardRef.classList.add('slider__image--right');
  leftCardRef.classList.remove('slider__image--left');
  leftCardRef.classList.add('slider__image--main');

  if (leftDOMElement) {
    renderLeftImage(leftDOMElement);
  } else {
    leftButtonRef.disabled = true;
  }

  if (rightButtonRef.disabled) {
    rightButtonRef.disabled = false;
  }
}

function moveSliderToRight() {
  const mainCardRef = document.querySelector('.slider__image--main');
  const leftCardRef = document.querySelector('.slider__image--left');
  const rightCardRef = document.querySelector('.slider__image--right');

  if (leftCardRef) {
    leftCardRef.style.transform = 'translateX(-400%)';
    leftCardRef.style.opacity = 0;
  }
  mainCardRef.style.transform = 'translateX(-200%)';
  mainCardRef.style.opacity = 0;
  rightCardRef.style.transform = 'translateX(0)';
  rightCardRef.style.opacity = 1;

  if (leftCardRef) {
    leftCardRef.parentNode.remove();
  }
  mainDOMElement = rightDOMElement;
  leftDOMElement = mainDOMElement.previousElementSibling;
  rightDOMElement = mainDOMElement.nextElementSibling;

  mainCardRef.classList.remove('slider__image--main');
  mainCardRef.classList.add('slider__image--left');
  rightCardRef.classList.remove('slider__image--right');
  rightCardRef.classList.add('slider__image--main');

  if (rightDOMElement) {
    renderRightImage(rightDOMElement);
  } else {
    rightButtonRef.disabled = true;
  }

  if (leftButtonRef.disabled) {
    leftButtonRef.disabled = false;
  }
}

function onEscPress(event) {
  if (event.code === 'Escape') {
    stopSlider();
  }
}

function onErrowsPress(event) {
  if (event.code === 'ArrowLeft' && !leftButtonRef.disabled) {
    moveSliderToLeft();
  }

  if (event.code === 'ArrowRight' && !rightButtonRef.disabled) {
    moveSliderToRight();
  }
}

function onBackdropClick(event) {
  console.log(event.target);
  if (event.target === event.currentTarget) {
    stopSlider();
  }
}

function stopSlider() {
  document.querySelector('.slider').classList.add('is-hidden');
  document.querySelector('.slider').innerHTML = '';

  leftButtonRef.removeEventListener('click', moveSliderToLeft);
  rightButtonRef.removeEventListener('click', moveSliderToRight);
  closeButtonRef.removeEventListener('click', stopSlider);
  document.body.removeEventListener('keydown', onEscPress);
  document.body.removeEventListener('keydown', onErrowsPress);
  backdropRef.removeEventListener('click', onBackdropClick);
  document.body.style.overflow = 'visible';

  mainDOMElement = null;
  leftDOMElement = null;
  rightDOMElement = null;
}
