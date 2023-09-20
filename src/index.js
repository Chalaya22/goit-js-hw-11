import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PixabayApiService from './js/pixabay-service';
import LoadMoreBtn from './js/loadMoreBtn';

const searchform = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
// const btnLoadMore = document.querySelector();

const pixabayApi = new PixabayApiService();
const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more', hidden: true });

async function searchSubmitHandler(e) {
  e.preventDefault();

  pixabayApi.searchQuery = e.currentTarget.elements.searchQuery.value; //ссылка на форму для динамического поиска

  loadMoreBtn.show();
  loadMoreBtn.disabled();

  pixabayApi.resetPage();
  pixabayApi.fetchHits().then(hits => {
    clearHitsGallery();
    fillGallery(hits);
    loadMoreBtn.enable();
    const gallaryStuye = new SimpleLightbox('.gallery a').refresh();
    if (hits.length === 0) {
      return badRequest();
    } else {
      return successRequest();
    }
  });
}

searchLoadMoreHandler = () => {
  loadMoreBtn.disabled();
  pixabayApi.fetchHits().then(hits => {
    fillGallery(hits);
  });
  loadMoreBtn.enable();
};

function clearHitsGallery() {
  galleryList.innerHTML = ' ';
}
// let quantity = hits.totalHits.value;
const successRequest = quantity => {
  Notify.success(`Hooray! We found ${quantity} images.`);
};
const badRequest = () => {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
};

function fillGallery(arr) {
  const template = arr
    .map(
      hit => `<div class="photo-card">
      <a class = 'link_of_gallary' href = '${hit.largeImageURL}'>
  <img  src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy  /> </a>
  <div class="info">
    <p class="info-item">
      <b>Likes : </b>${hit.likes}
    </p>
    <p class="info-item">
      <b>Views : </b>${hit.views}
    </p>
    <p class="info-item">
      <b>Comments: </b>${hit.comments}
    </p>
    <p class="info-item">
      <b>Downloads: </b>${hit.downloads}
    </p>
  </div>
</div>`
    )
    .join('');
  galleryList.insertAdjacentHTML('beforeend', template);
}

searchform.addEventListener('submit', searchSubmitHandler);
// btnLoadMore.addEventListener('click', searchLoadMoreHandler);
loadMoreBtn.refs.button.addEventListener('click', searchLoadMoreHandler);
