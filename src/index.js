import API from './js/image-api-service';
import LoadMoreBtn from './js/load-more-btn.js';
import Spinner from './js/image-spinner';
import galleryTmp from './templates/image-gallery.hbs';

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

  await api.fetchNewCollection(query).then(renderGalleryMarkup);

  inputReset();
  loadMoreBtn.show();
}

async function onLoadMore() {
  loadMoreBtn.loading();
  await api.fetchNextCollection(query).then(renderGalleryMarkup);
  loadMoreBtn.loaded();
  inputReset();
}

async function renderGalleryMarkup(data) {
  mainSpinner.stop();

  const markup = await galleryTmp(data);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  gallerySpinners.stopAll();
}

function inputReset() {
  refs.input.value = '';
}
