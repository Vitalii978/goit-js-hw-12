import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const galleryList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');
const loader = document.querySelector('.loader');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});


export function renderGallery(images) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" width='360'/>
        </a>
        <ul class='list'>
          <li class='item'>
            <span>Likes</span>
            <span>${likes}</span>
          </li>
          <li class='item'>
            <span>Views</span>
            <span>${views}</span>
          </li>
          <li class='item'>
            <span>Comments</span>
            <span>${comments}</span>
          </li>
          <li class='item'>
            <span>Downloads</span>
            <span>${downloads}</span>
          </li>
        </ul>
      </li>`
    )
    .join('');

  galleryList.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh(); 
}


export function clearGallery() {
  galleryList.innerHTML = '';
}


export function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('is-hidden');
}


export function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('is-hidden');
}


export function showLoader() {
  loader.classList.remove('is-hidden');
}


export function hideLoader() {
  loader.classList.add('is-hidden');
}