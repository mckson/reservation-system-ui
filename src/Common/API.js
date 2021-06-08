import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import LocalStorageService from './LocalStorageService';

const localStorageService = LocalStorageService.getService();
const baseURL = 'https://localhost:5001/api';

const hotelUrl = (id) => `/Hotels/${id}`;
const roomUrl = (id) => `/Rooms/${id}`;
const serviceUrl = (id) => `/Services/${id}`;
const userUrl = (id) => `/Users/${id}`;

const usersUrl = '/Users';

const hotelsUrl = (pageNumber, pageSize, name, city, services) =>
  `/Hotels?pageNumber=${pageNumber}&PageSize=${pageSize}&name=${name}&city=${city}${services
    .map((service) => `&services=${service}`)
    .join('')}`;

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
    // eslint-disable-next-line no-debugger
    debugger;
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // const history = useHistory();
    // eslint-disable-next-line no-debugger
    debugger;
    const originalRequest = error.config;

    if (originalRequest.url === '/Account/RefreshToken') {
      // eslint-disable-next-line no-debugger
      debugger;
      localStorageService.clearToken();
      window.location.href = '/SignIn';
      // return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;

      // eslint-disable-next-line no-debugger
      debugger;
      return axios
        .post('/Account/RefreshToken', {
          token: localStorageService.getRefreshToken(),
        })
        .then((response) => {
          // eslint-disable-next-line no-debugger
          debugger;
          localStorageService.setToken(response.data);
          axios.defaults.headers.Authorization = `Bearer ${localStorageService.getAccessToken()}`;
          // return axios(originalRequest);
          return axios(originalRequest);
        });
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

const getHotels = (pageNumber, pageSize, name, city, services) => {
  return new Promise((resolve, reject) => {
    axios
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
        // eslint-disable-next-line no-debugger
        debugger;
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
        // eslint-disable-next-line no-debugger
        debugger;
        resolve(response.data);
      })
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
};
