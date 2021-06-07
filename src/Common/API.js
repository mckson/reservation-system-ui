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

const getHotel = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(hotelUrl(id))
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

const updateRoom = (room) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(roomUrl(room.id), room)
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const deleteRoom = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(roomUrl(id))
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.log(error);
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

const updateService = (service) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(serviceUrl(service.id), service)
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const deleteService = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(serviceUrl(id))
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.log(error);
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
  getHotel,
  createRoom,
  updateRoom,
  deleteRoom,
  createService,
  updateService,
  deleteService,
};
