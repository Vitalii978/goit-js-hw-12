import { getImagesByQuery } from './js/pixabay-api';
import {
  renderGallery,
  clearGallery,
  showLoadMoreBtn,
  hideLoadMoreBtn,
  showLoader,
  hideLoader,
} from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn'); // кнопка Load more
let query = '';
let page = 1;
const perPage = 15;
let totalPages = 0;


form.addEventListener('submit', async event => {
  event.preventDefault();

  query = event.currentTarget.elements['searchQuery'].value.trim();

  if (!query) {
    clearGallery();
    hideLoadMoreBtn();
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreBtn();
  showLoader();

  try {
    const { hits, totalHits } = await getImagesByQuery(query, page, perPage);

    if (hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    renderGallery(hits);
    totalPages = Math.ceil(totalHits / perPage);

    if (totalHits <= perPage) {
      hideLoadMoreBtn();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreBtn();
    }

  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error('Error fetching images:', error.message);
  } finally {
    hideLoader();
  }
});


loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreBtn();
  showLoader();

  try {
    const { hits } = await getImagesByQuery(query, page, perPage);
    renderGallery(hits);

    if (page >= totalPages) {
      hideLoadMoreBtn();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreBtn();
    }

   
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong while loading more images.',
      position: 'topRight',
    });
    console.error('Error loading more images:', error.message);
  } finally {
    hideLoader();
  }
});