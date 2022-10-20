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
    translateX: '-103%',
    zIndex: 140,
    opacity: 0.5,
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
    translateX: '103%',
    zIndex: 145,
    opacity: 0.5,
  };

  const innerContainer = document.querySelector('.slider__image-container');
  const markup = sliderImageTmp(rightImage);
  innerContainer.insertAdjacentHTML('beforeend', markup);
}

function activateSliderButtons() {
  leftButtonRef = document.querySelector('.slider__button--left');
  rightButtonRef = document.querySelector('.slider__button--right');

  if (!leftDOMElement) {
    leftButtonRef.disabled = true;
  }

  if (!rightDOMElement) {
    rightButtonRef.disabled = true;
  }

  leftButtonRef.addEventListener('click', moveSliderToLeft);
  rightButtonRef.addEventListener('click', moveSliderToRight);
}

function moveSliderToLeft() {
  const mainCardRef = document.querySelector('.slider__image--main');
  const leftCardRef = document.querySelector('.slider__image--left');
  const rightCardRef = document.querySelector('.slider__image--right');

  if (rightCardRef) {
    rightCardRef.style.transform = 'translateX(206%)';
    rightCardRef.style.opacity = 0;
  }

  mainCardRef.style.transform = 'translateX(103%)';
  mainCardRef.style.opacity = 0.5;
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
    leftCardRef.style.transform = 'translateX(-206%)';
    leftCardRef.style.opacity = 0;
  }
  mainCardRef.style.transform = 'translateX(-103%)';
  mainCardRef.style.opacity = 0.5;
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

///////////////////////////////////////////////////////

// let mainImage = null;
// let leftImage = null;
// let rightImage = null;

// export function runSlider() {
//   const cards = document.querySelectorAll('.photo-card');

//   cards.forEach(card => {
//     card.addEventListener('click', sliderHandler);
//   });
// }

// export function stopSlider() {}

// function sliderHandler(event) {
//   setMainImage(event.currentTarget);
//   setLeftImage(event.currentTarget);
//   setRightImage(event.currentTarget);
//   console.dir(mainImage);
//   console.dir(leftImage);
//   console.dir(rightImage);

//   renderSliderContainer('.slider');
//   renderMainImage();
//   renderLeftImage();
//   renderRightImage();
// }

// function setMainImage(elem) {
//   mainImage = {
//     source: elem.children[1].firstElementChild.dataset.source,
//     translateX: 0,
//     zIndex: 150,
//     opacity: 1,
//   };
// }

// function setLeftImage(elem) {
//   leftImage = {
//     source:
//       elem.previousElementSibling.children[1].firstElementChild.dataset.source,
//     translateX: '-102%',
//     zIndex: 140,
//     opacity: 0.5,
//   };
// }

// function setRightImage(elem) {
//   rightImage = {
//     source:
//       elem.nextElementSibling.children[1].firstElementChild.dataset.source,
//     translateX: '102%',
//     zIndex: 145,
//     opacity: 0.5,
//   };
// }

// function renderSliderContainer(sliderSelector) {
//   document.querySelector(sliderSelector).innerHTML = sliderContainer();
//   document.querySelector(sliderSelector).classList.remove('is-hidden');
// }

// function renderMainImage() {
//   const innerContainer = document.querySelector('.slider__image-container');
//   const markup = sliderImage(mainImage);
//   innerContainer.insertAdjacentHTML('beforeend', markup);
// }

// function renderLeftImage() {
//   const innerContainer = document.querySelector('.slider__image-container');
//   const markup = sliderImage(leftImage);
//   innerContainer.insertAdjacentHTML('afterbegin', markup);
// }

// function renderRightImage() {
//   const innerContainer = document.querySelector('.slider__image-container');
//   const markup = sliderImage(rightImage);
//   innerContainer.insertAdjacentHTML('beforeend', markup);
// }

/////////////////////////////////////////

// function sliderHandler(event) {
//   let pictures = getImages(event.currentTarget);
//   console.log(pictures);

//   document.querySelector('.slider').classList.remove('is-hidden');

//   document.body.addEventListener('keydown', onEsc);

//   const markup = sliderTmp(pictures);
//   document.querySelector('.slider').innerHTML = markup;

//   const leftBtnRef = document.querySelector('.slider__button--to-left');
//   const rightBtnRef = document.querySelector('.slider__button--to-right');

//   leftBtnRef.addEventListener('click', () => {
//     const mainPicture = document.querySelector('.slider__thumb--main');
//     const leftPicture = document.querySelector('.slider__thumb--hidden-left');
//     const rightPicture = document.querySelector('.slider__thumb--hidden-right');

//     console.log(mainPicture);

//     mainPicture.style.transform = 'translateX(-100%)';
//     leftPicture.style.transform = 'translateX(-100%)';
//     rightPicture.style.transform = 'translateX(-100%)';

//     console.log(pictures);
//     pictures = getImages(pictures.rightCard);
//     console.log(pictures);
//     setTimeout(() => {
//       const markup2 = sliderTmp(pictures);
//       document.querySelector('.slider').innerHTML = markup2;
//     }, 500);
//   });
// }

// function getImages(element) {
//   const mainCard = element;
//   const leftCard = mainCard.previousElementSibling;
//   const rightCard = mainCard.nextElementSibling;

//   const mainImage = mainCard.children[1].firstElementChild.dataset.source;
//   const leftImage = !leftCard
//     ? null
//     : leftCard.children[1].firstElementChild.dataset.source;
//   const rightImage = !rightCard
//     ? null
//     : rightCard.children[1].firstElementChild.dataset.source;

//   //   console.dir(mainImage);
//   //   console.dir(leftImage);
//   //   console.dir(rightImage);

//   return { mainImage, leftImage, rightImage, mainCard, leftCard, rightCard };
// }

// function onEsc(event) {
//   console.dir(event);

//   if (event.code === 'Escape') {
//     document.querySelector('.slider').classList.add('is-hidden');
//   }
// }

// export default sliderHandler;
