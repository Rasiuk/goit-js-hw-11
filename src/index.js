// https://pixabay.com/api/
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Notiflix from 'notiflix';
const BASE_URL = 'https://pixabay.com/api/';
const KEY__URL = '32915984-753662c00e21893fc193d0b46';
let searchName = '';
let currentPage = '';
const refs = {
  gallery: document.querySelector('.gallery'),
  searchBtn: document.querySelector('.search-btn'),
  loadMore: document.querySelector('.load-more'),
  input: document.querySelector('input'),
};

refs.loadMore.style.display = 'none';
refs.searchBtn.addEventListener('click', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

async function getUser() {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${KEY__URL}&q=${searchName}&page=${currentPage}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
function createMarcup(hits) {
  const marcup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="gallery__item">
  <a class="gallery__link" href="${largeImageURL}" title="${tags}"><img class="gallery__image " src="${webformatURL}" alt="${tags}" /></a>
    
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span class="stats">${likes}</span>
    </p>
    <p class="info-item">
      <b>Vievs</b>
      <span class="stats">${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span class="stats">${comments}
</span>    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span class="stats">${downloads}</span>
    </p>
  </div>
</div>`
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', marcup);
}
function onSearch(evt) {
  evt.preventDefault();
  refs.gallery.innerHTML = '';

  currentPage = 1;
  searchName = refs.input.value;
  getUser().then(respone => {
    if (respone.hits.length === 0) {
      return errorMessage();
      // return console.log(
      //   'Sorry, there are no images matching your search query. Please try again.'
      // );
    }

    createMarcup(respone.hits);
    refs.loadMore.style.display = 'block';
    totalHitsMesage(respone.totalHits);
  });
}
function onLoadMore(evt) {
  currentPage += 1;
  getUser().then(respone => createMarcup(respone.hits));
}
let gallery = new SimpleLightbox('.gallery');
function totalHitsMesage(totalHits) {
  Notify.success(`Hooray! We found ${totalHits} images.`);
}
function errorMessage() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
