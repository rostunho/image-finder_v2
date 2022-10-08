import API from './js/image-api-service';
import LoadMoreBtn from './js/load-more-btn.js';
import Spinner from './js/image-spinner';
import galleryTmp from './templates/image-gallery.hbs';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.search-form input'),
  gallery: document.querySelector('.gallery-list'),
  loadMoreBtn: document.querySelector('.load-more'),
  buttonSpinner: document.querySelector('.button-spinner'),
};

const api = new API();
const loadMoreBtn = new LoadMoreBtn(refs.loadMoreBtn, refs.buttonSpinner);
const spinner = new Spinner('.spinner');

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let query;

async function onSubmit(event) {
  event.preventDefault();

  query = event.currentTarget.elements.searchQuery.value;

  refs.gallery.innerHTML = '';
  spinner.run();

  await api.fetchNewCollection(query).then(renderGalleryMarkup);

  loadMoreBtn.show();
  inputReset();
}

async function onLoadMore() {
  loadMoreBtn.loading();
  await api.fetchNextCollection(query).then(renderGalleryMarkup);
  loadMoreBtn.loaded();
  inputReset();
}

async function renderGalleryMarkup(data) {
  spinner.stop();

  const markup = await galleryTmp(data);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  spinner.stopAll();
}

function inputReset() {
  refs.input.value = '';
}
