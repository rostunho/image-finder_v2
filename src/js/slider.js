import sliderTmp from '../templates/slider.hbs';

function sliderHandler(event) {
  let pictures = getImages(event.currentTarget);
  console.log(pictures);

  document.querySelector('.slider').classList.remove('is-hidden');

  document.body.addEventListener('keydown', onEsc);

  const markup = sliderTmp(pictures);
  document.querySelector('.slider').innerHTML = markup;

  const leftBtnRef = document.querySelector('.slider__button--to-left');
  const rightBtnRef = document.querySelector('.slider__button--to-right');

  leftBtnRef.addEventListener('click', () => {
    const mainPicture = document.querySelector('.slider__thumb--main');
    const leftPicture = document.querySelector('.slider__thumb--hidden-left');
    const rightPicture = document.querySelector('.slider__thumb--hidden-right');

    console.log(mainPicture);

    mainPicture.style.transform = 'translateX(-100%)';
    leftPicture.style.transform = 'translateX(-100%)';
    rightPicture.style.transform = 'translateX(-100%)';

    console.log(pictures);
    pictures = getImages(pictures.rightCard);
    console.log(pictures);
    setTimeout(() => {
      const markup2 = sliderTmp(pictures);
      document.querySelector('.slider').innerHTML = markup2;
    }, 500);
  });
}

function getImages(element) {
  const mainCard = element;
  const leftCard = mainCard.previousElementSibling;
  const rightCard = mainCard.nextElementSibling;

  const mainImage = mainCard.children[1].firstElementChild.dataset.source;
  const leftImage = !leftCard
    ? null
    : leftCard.children[1].firstElementChild.dataset.source;
  const rightImage = !rightCard
    ? null
    : rightCard.children[1].firstElementChild.dataset.source;

  //   console.dir(mainImage);
  //   console.dir(leftImage);
  //   console.dir(rightImage);

  return { mainImage, leftImage, rightImage, mainCard, leftCard, rightCard };
}

function onEsc(event) {
  console.dir(event);

  if (event.code === 'Escape') {
    document.querySelector('.slider').classList.add('is-hidden');
  }
}

export default sliderHandler;
