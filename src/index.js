// https://pixabay.com/api/
import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const KEY__URL = '32915984-753662c00e21893fc193d0b46';
let searchName = 'flowers';
const refs = {
  gallery: document.querySelector('.gallery'),
  searchBtn: document.querySelector('.search-btn'),
  input: document.querySelector('input'),
};

refs.searchBtn.addEventListener('click', onSearch);
async function getUser() {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${KEY__URL}&q=${searchName}&page=1&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
getUser();
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
      }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="320px" height="240px"/>
  <div class="info">
    <p class="info-item">
      <b>Likes:${likes}</b>
    </p>
    <p class="info-item">
      <b>Vievs:${views}</b>
    </p>
    <p class="info-item">
      <b>Comments:${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:${downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
  refs.gallery.innerHTML = marcup;
}
function onSearch(evt) {
  evt.preventDefault();
  searchName = refs.input.value;
  getUser().then(respone => createMarcup(respone.hits));
}
