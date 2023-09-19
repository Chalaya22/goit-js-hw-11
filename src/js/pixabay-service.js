import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39344710-74bbb124ce1c1439ca3e67f9f';

export default class PixabayApiService {
  constructor() {
    this.searchingQuery = '';
    this.page = 1;
  }

  fetchHits() {
    console.log(this); // перед каждым артиклом видим ссылку на наш обьект

    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchingQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=4&page=${this.page}`;
    return axios(url)
      .then(r => r.data)
      .then(data => {
        console.log(data);
        this.incrementPage();
        return data.hits;
      });
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1; // сбрасывает страничку в еденичку
  }

  get searchQuery() {
    return this.searchingQuery;
  }
  set searchQuery(newSearchingQuery) {
    this.searchingQuery = newSearchingQuery;
  }
}
