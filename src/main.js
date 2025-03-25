import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.form');
const input = document.querySelector('input[name="search-input"]');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
let currentPage = 1;
let query = '';

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';

  query = input.value.trim();

  if (!query) {
    return iziToast.error({
      title: '',
      message: 'Please enter a search query!',
    });
  }

  currentPage = 1;

  fetchImages(query, currentPage)
    .then(({ images, totalPages: fetchedTotalPages }) => {
      renderImages(images);
      console.log(fetchedTotalPages);
      if (currentPage < fetchedTotalPages) {
        loadMoreBtn.style.display = 'block';
      } else {
        loadMoreBtn.style.display = 'none';
      }
      const galleryItem = document.querySelector('.gallery-item');
      const { height } = galleryItem.getBoundingClientRect();
      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    })
    .catch(error => {
      throw error.message;
    });
});

loadMoreBtn.addEventListener('click', () => {
  currentPage += 1;

  fetchImages(query, currentPage)
    .then(({ images, totalPages: fetchedTotalPages }) => {
      renderImages(images);
      if (currentPage < fetchedTotalPages) {
        loadMoreBtn.style.display = 'block';
      } else {
        loadMoreBtn.style.display = 'none';
        iziToast.info({
          title: '',
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
      const galleryItem = document.querySelector('.gallery-item');
      const { height } = galleryItem.getBoundingClientRect();
      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    })
    .catch(error => {
      throw error.message;
    });
});
