import axios from 'axios';

const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: `Client-ID FfrLwFErnvPOKL06R7KdNkyblAxPXcGB-qIa1QK5ZjM`
  }
});

export const fetchPhotos = (page = 1) => {
  return unsplashApi.get('/photos', { params: { page, per_page: 12 } });
};

export const fetchPhotoDetails = (id) => {
  return unsplashApi.get(`/photos/${id}`);
};
