import axios from 'axios';
export default async function getImages(searchName, currentPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY__URL = '32915984-753662c00e21893fc193d0b46';

  const response = await axios.get(
    `${BASE_URL}?key=${KEY__URL}&q=${searchName}&page=${currentPage}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
  );
  console.log(response.data);
  return response.data;
}
