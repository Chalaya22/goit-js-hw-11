export function fillGallery(arr) {
  const galleryList = document.querySelector('.gallery');
  const template = arr
    .map(
      hit => `<div class="photo-card">
      // <a  class = 'link_of_gallary' href="${hit.largeImageURL}"></a>
  <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${hit.likes}
    </p>
    <p class="info-item">
      <b>Views</b>${hit.views}
    </p>
    <p class="info-item">
      <b>Comments</b>${hit.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${hit.downloads}
    </p>
  </div>
</div>`
    )
    .join('');
  galleryList.insertAdjacentHTML('beforeend', template);
}
