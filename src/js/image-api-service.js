const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24252951-ddd51d265365deb12d4398809';

// fetch(`${BASE_URL}?key=${API_KEY}&q=cat&per_page=20&page=2`);

export default class ImageAPI {
  constructor() {
    this.page = 1;
    this.perPage = 9;
  }

  async fetchNewCollection(searchQuery) {
    this.page = 1;

    const newCollection = await this.fetchImages(searchQuery);

    return newCollection;
  }

  async fetchNextCollection(searchQuery) {
    this.page += 1;

    const nextCollection = await this.fetchImages(searchQuery);
    return nextCollection;
  }

  async fetchImages(searchQuery) {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&per_page=${this.perPage}&page=${this.page}`
    );

    const images = await response.json();
    return images.hits;
  }
}
