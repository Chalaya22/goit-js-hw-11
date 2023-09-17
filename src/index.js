// import axios from 'axios';
// axios.defaults.headers.common['x-api-key'] =
//   'live_ArwZ5FQbdEO9JEaPL9lt29Bd5vQ1BQWcfYtXLyZyQUO1zLKhna3wIM9pin9mvn0g';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PixabayApiService from './js/pixabay-service';
import { fillGallery } from './js/template';

// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '39344710-74bbb124ce1c1439ca3e67f9f';

const searchform = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

const pixabayApi = new PixabayApiService();

const searchSubmitHandler = e => {
  e.preventDefault();
  clearHitsGallery();
  pixabayApi.searchQuery = e.currentTarget.elements.searchQuery.value; //ссылка на форму для динамического поиска
  pixabayApi.resetPage();
  pixabayApi.fetchHits().then(fillGallery);
};

searchLoadMoreHandler = () => {
  pixabayApi.fetchHits().then(fillGallery);
};

function clearHitsGallery() {
  galleryList.innerHTML = '';
}

searchform.addEventListener('submit', searchSubmitHandler);
btnLoadMore.addEventListener('click', searchLoadMoreHandler);
