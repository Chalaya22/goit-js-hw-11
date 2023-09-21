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

  pixabayApi.searchQuery = e.currentTarget.elements.searchQuery.value.trim(); //ссылка на форму для динамического поиска

  loadMoreBtn.show();

  pixabayApi.resetPage();
  pixabayApi.quantityOnPage = 0;

  try {
    const response = await pixabayApi.fetchHits();
    console.log(response);

    clearHitsGallery();
    fillGallery(response.hits);

    const gallaryStuye = new SimpleLightbox('.gallery a').refresh();
    if (!pixabayApi.searchQuery) {
      loadMoreBtn.hide();
      clearHitsGallery();
      return fillSearchQuery();
    }
    if (response.hits.length === 0) {
      loadMoreBtn.hide();
      return badRequest();
    }
    if (response) {
      loadMoreBtn.disabled();
      loadMoreBtn.enable();
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
    }
    pixabayApi.quantityOnPage += response.hits.length;
    if (totalHits <= pixabayApi.quantityOnPage) {
      Notify.info("We're sorry, but you've reached the end of search results");
      loadMoreBtn.hide();
    }
  } catch (error) {
    console.log(error);
  }
}

async function searchLoadMoreHandler() {
  loadMoreBtn.disabled();
  try {
    const response = await pixabayApi.fetchHits();
    fillGallery(response.hits);
    loadMoreBtn.enable();
  } catch (error) {
    console.log(error);
  }
}

function clearHitsGallery() {
  galleryList.innerHTML = ' ';
}

// const successRequest = () => {
//   Notify.success(`Hooray! We found ${response.totalHits} images.`);
// };
const badRequest = () => {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
};
// const lastPageOf = () => {
//   Notify.info("We're sorry, but you've reached the end of search results");
// };
export const fillSearchQuery = () => {
  Notify.info('Empty');
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
loadMoreBtn.refs.button.addEventListener('click', searchLoadMoreHandler);
