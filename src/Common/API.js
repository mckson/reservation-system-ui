import axios from 'axios';

const hotelsUrl = (pageNumber, pageSize, name, city, services) =>
  `/Hotels?pageNumber=${pageNumber}&PageSize=${pageSize}&name=${name}&city=${city}${services
    .map((service) => `&services=${service}`)
    .join('')}`;

const hotelUrl = (id) => `/Hotels/${id}`;

const roomUrl = (id) => `/Rooms/${id}`;

const serviceUrl = (id) => `/Services/${id}`;

const axiosInstance = axios.create({
  baseURL: 'https://localhost:5001/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
});

const getHotels = (pageNumber, pageSize, name, city, services) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(hotelsUrl(pageNumber, pageSize, name, city, services))
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteHotel = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(hotelUrl(id))
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.log(error.response);
        reject(error);
      });
  });
};

const updateHotel = (hotel) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(hotelUrl(hotel.id), hotel)
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.log(error.response);
        reject(error);
      });
  });
};

const createHotel = (hotel) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(hotelUrl(''), hotel)
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.log(error.response);
        reject(error);
      });
  });
};

const createRoom = (room) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(roomUrl(''), room)
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.log(error.response);
        reject(error);
      });
  });
};

const createService = (service) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(serviceUrl(''), service)
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.log(error.response);
        reject(error);
      });
  });
};

export default {
  axiosInstance,
  getHotels,
  deleteHotel,
  updateHotel,
  createHotel,
  createRoom,
  createService,
};
