import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import LocalStorageService from './LocalStorageService';

const localStorageService = LocalStorageService.getService();
const baseURL = 'https://localhost:5001/api';

const hotelUrl = (id) => `/Hotels/${id}`;
const roomUrl = (id) => `/Rooms/${id}`;
const serviceUrl = (id) => `/Services/${id}`;
const userUrl = (id) => `/Users/${id}`;
const imageUrl = (id) => `/Images/${id}`;
const reservationUrl = (id) => `/Reservations/${id}`;

const usersUrl = '/Users';

const hotelsUrl = (
  pageNumber,
  pageSize,
  dateIn,
  dateOut,
  manager,
  name,
  city,
  services
) =>
  `/Hotels?pageNumber=${pageNumber}&pageSize=${pageSize}&dateIn=${
    dateIn || ''
  }&dateOut=${dateOut || ''}&managerId=${manager || ''}&name=${
    name || ''
  }&city=${city || ''}${
    services ? services.map((service) => `&services=${service}`).join('') : ''
  }`;

const roomsUrl = (pageNumber, pageSize, hotelId, dateIn, dateOut) =>
  `/Rooms?pageNumber=${pageNumber}&pageSize=${
    pageSize || ''
  }&hotelId=${hotelId}&dateIn=${dateIn || ''}&dateOut=${dateOut || ''}`;

axios.defaults.baseURL = baseURL;

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorageService.getAccessToken();

    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (originalRequest.url === '/Account/RefreshToken') {
      localStorageService.clearToken();
      window.location.href = '/SignIn';
    }

    if (error.response) {
      if (error.response.status === 401 && !originalRequest.retry) {
        originalRequest.retry = true;

        return axios
          .post('/Account/RefreshToken', {
            token: localStorageService.getRefreshToken(),
          })
          .then((response) => {
            localStorageService.setToken(response.data);
            axios.defaults.headers.Authorization = `Bearer ${localStorageService.getAccessToken()}`;
            return axios(originalRequest);
          });
      }
    } else {
      // handle server down
    }

    return Promise.reject(error);
  }
);

const getUsers = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(usersUrl)
      .then((response) => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });
};

const getHotels = (
  pageNumber,
  pageSize,
  dateIn,
  dateOut,
  manager,
  name,
  city,
  services
) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        hotelsUrl(
          pageNumber,
          pageSize,
          dateIn,
          dateOut,
          manager,
          name,
          city,
          services
        )
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getRooms = (pageNumber, pageSize, hotelId, dateIn, dateOut) => {
  return new Promise((resolve, reject) => {
    axios
      .get(roomsUrl(pageNumber, pageSize, hotelId, dateIn, dateOut))
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const deleteHotel = (id) => {
  return new Promise((resolve, reject) => {
    axios
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
    axios
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
    axios
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
    axios
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
    axios
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
    axios
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
    axios
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
    axios
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
    axios
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
    axios
      .delete(serviceUrl(id))
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const updateUser = (user) => {
  return new Promise((resolve, reject) => {
    axios
      .put(userUrl(user.id), user)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const createImage = (image) => {
  return new Promise((resolve, reject) => {
    axios
      .post(imageUrl(''), image)
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.log(error.response);
        reject(error);
      });
  });
};

const deleteImage = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(imageUrl(id))
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const createReservation = (reservation) => {
  return new Promise((resolve, reject) => {
    axios
      .post(reservationUrl(''), reservation)
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export default {
  axios,
  getUsers,
  getHotels,
  getRooms,
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
  updateUser,
  createImage,
  deleteImage,
  createReservation,
};
