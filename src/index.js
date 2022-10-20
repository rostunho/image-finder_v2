import API from './js/image-api-service';
import LoadMoreBtn from './js/load-more-btn.js';
import Spinner from './js/image-spinner';
import galleryTmp from './templates/image-gallery.hbs';
import { runSlider, stopSlider } from './js/slider.js';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.search-form__input'),
  gallery: document.querySelector('.gallery__list'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

const api = new API();
const loadMoreBtn = new LoadMoreBtn('.load-more-btn');
const mainSpinner = new Spinner('.gallery > .spinner');
const gallerySpinners = new Spinner('.photo-card .spinner');

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let query;

async function onSubmit(event) {
  event.preventDefault();

  query = event.currentTarget.elements.searchQuery.value;

  refs.gallery.innerHTML = '';
  loadMoreBtn.hide();
  mainSpinner.run();

  await api.fetchNewCollection(query).then(createGallery);

  inputReset();
  loadMoreBtn.show();
}

async function onLoadMore() {
  loadMoreBtn.loading();
  await api.fetchNextCollection(query).then(createGallery);
  loadMoreBtn.loaded();
  inputReset();
}

async function createGallery(data) {
  mainSpinner.stop();

  const markup = await galleryTmp(data);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  gallerySpinners.stopAll();
  runSlider();
}

function inputReset() {
  refs.input.value = '';
}

// function addListenersToCards() {
//   const cardsRefs = document.querySelectorAll('.photo-card');
//   console.log(cardsRefs);

//   cardsRefs.forEach(card => {
//     card.addEventListener('click', sliderHandler);
//   });
// }
