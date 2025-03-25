// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = null;

export function renderImages(images) {
  if (!images || images.length === 0) {
    return iziToast.error({
      title: '',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  }

  const gallery = document.querySelector('.gallery');
  const galleryMarkup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item">
	<a class="gallery-link" href="${largeImageURL}">
		<img
			class="gallery-image"
			src="${webformatURL}"
			alt="${tags}"
			/>
	</a>
    <div class="info">
        <div class="info-item">
            <h3>Likes</h3>
            <p>${likes}</p>
        </div>
        <div class="info-item">
            <h3>Views</h3>
            <p>${views}</p>
        </div>
        <div class="info-item">
            <h3>Comments</h3>
            <p>${comments}</p>
        </div>
        <div class="info-item">
            <h3>Downloads</h3>
            <p>${downloads}</p>
        </div> 
    </div>
</li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', galleryMarkup);

  lightbox = new SimpleLightbox('.gallery-link', {
    captionsData: 'alt',
    captionDelay: 250,
    overlay: true,
    overlayOpacity: 0.8,
  });

  lightbox.refresh();
}
