// https://pixabay.com/api/
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getImages from './fetchImages';
import Notiflix from 'notiflix';

let searchName = '';
let currentPage = '';
const refs = {
  gallery: document.querySelector('.gallery'),
  searchBtn: document.querySelector('.search-btn'),
  loadMore: document.querySelector('.load-more'),
  input: document.querySelector('input'),
};

function hiddenBtn() {
  refs.loadMore.style.display = 'none';
}
hiddenBtn();
refs.searchBtn.addEventListener('click', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);
let gallery = new SimpleLightbox('.gallery a');

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
      
  <a class="gallery__link" href="${largeImageURL}" title="${tags}"><img class="gallery__image " src="${webformatURL}" alt="${tags}"  loading="lazy"  /></a>
    
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
  gallery.refresh();
}
function onSearch(evt) {
  evt.preventDefault();
  hiddenBtn();
  refs.gallery.innerHTML = '';
  refs.loadMore.style.display = 'block';
  currentPage = 1;
  searchName = refs.input.value;
  getImages(searchName, currentPage).then(respone => {
    if (respone.hits.length === 0) {
      return errorMessage();
    }
    if (respone.hits.length < 40) {
      hiddenBtn();
      endOfimages();
    }

    createMarcup(respone.hits);
    totalHitsMesage(respone.totalHits);
  });
}
function onLoadMore(evt) {
  currentPage += 1;
  getImages(searchName, currentPage).then(respone => {
    if (respone.hits.length < 40) {
      hiddenBtn();
      endOfimages();
    }
    createMarcup(respone.hits);
  });
}

function totalHitsMesage(totalHits) {
  Notify.success(`Hooray! We found ${totalHits} images.`);
}
function errorMessage() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
function endOfimages() {
  Notify.info(`We're sorry, but you've reached the end of search results.`);
}
