import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '49479304-89a48f16eaa5319308b7de96a',
  per_page: 15,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export function showLoader() {
  document.querySelector('.loader').style.display = 'block';
}

export function hideLoader() {
  document.querySelector('.loader').style.display = 'none';
}

export async function fetchImages(query, page) {
  showLoader();
  try {
    const { data } = await axios.get('', {
      params: {
        q: query,
        page,
      },
    });
    const totalPages = Math.ceil(
      data.totalHits / axios.defaults.params.per_page
    );
    return {
      images: data.hits,
      totalPages,
    };
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  } finally {
    hideLoader();
  }
}
