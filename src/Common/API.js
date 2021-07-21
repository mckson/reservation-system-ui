import axios from 'axios';
import LocalStorageService from './LocalStorageService';

const localStorageService = LocalStorageService.getService();
const baseURL = 'https://localhost:5001/api';

const hotelUrl = (id) => `/Hotels/${id}`;
const roomUrl = (id) => `/Rooms/${id}`;
const serviceUrl = (id) => `/Services/${id}`;
const userUrl = (id) => `/Users/${id}`;
const hotelImageUrl = (id) => `/Images/Hotel/${id}`;
const roomImageUrl = (id) => `/Images/Room/${id}`;
const reservationUrl = (id) => `/Reservations/${id}`;
const roomViewUrl = (id) => `/RoomViews/${id}`;

const roomLockUrl = (id) => `${roomUrl(id)}/lock`;
const roomUnlockUrl = (id) => `${roomUrl(id)}/unlock`;

// brief user responses (for example, for search)
const allUsersUrl = '/Users/All';

// brief hotel responses (for example, for search)
const allHotelsUrl = '/Hotels/All';

// all unique room names
const roomNamesUrl = (hotelId) => `/Rooms/Names/${hotelId || ''}`;

const roomNumbersUrl = (hotelId) => `/Rooms/Numbers/${hotelId || ''}`;

const usersUrl = (pageNumber, pageSize, email, firstName, lastName) =>
  `/Users?pageNumber=${pageNumber}&pageSize=${pageSize}&email=${
    email || ''
  }&firstName=${firstName || ''}&lastName=${lastName || ''}`;

const hotelsUrl = ({
  pageNumber,
  pageSize,
  dateIn,
  dateOut,
  manager,
  name,
  city,
  services,
  minDeposit,
  maxDeposit,
  minFloors,
  maxFloors,
}) =>
  `/Hotels?pageNumber=${pageNumber}&pageSize=${pageSize}&dateIn=${
    dateIn || ''
  }&dateOut=${dateOut || ''}&managerId=${manager || ''}&name=${
    name || ''
  }&city=${city || ''}${
    services ? services.map((service) => `&services=${service}`).join('') : ''
  }&minDeposit=${minDeposit || ''}&maxDeposit=${maxDeposit || ''}&minFloors=${
    minFloors || ''
  }&maxFloors=${maxFloors || ''}`;

const roomsUrl = ({
  pageNumber,
  pageSize,
  hotelId,
  dateIn,
  dateOut,
  name,
  number,
  minFloorNumber,
  maxFloorNumber,
  minCapacity,
  maxCapacity,
  minArea,
  maxArea,
  minPrice,
  maxPrice,
  smoking,
  parking,
  facilities,
  roomViews,
}) =>
  `/Rooms?pageNumber=${pageNumber}&pageSize=${
    pageSize || ''
  }&hotelId=${hotelId}&dateIn=${dateIn || ''}&dateOut=${dateOut || ''}&name=${
    name || ''
  }&number=${number || ''}&minFloorNumber=${
    minFloorNumber || ''
  }&maxFloorNumber=${maxFloorNumber || ''}&minCapacity=${
    minCapacity || ''
  }&maxCapacity=${maxCapacity || ''}&minArea=${minArea || ''}&maxArea=${
    maxArea || ''
  }&minPrice=${minPrice || ''}&maxPrice=${maxPrice || ''}&smoking=${
    smoking || false
  }&parking=${parking || false}${
    facilities
      ? facilities.map((facility) => `&facilities=${facility}`).join('')
      : ''
  }${
    roomViews
      ? roomViews.map((roomView) => `&roomViews=${roomView}`).join('')
      : ''
  }`;

const reservationsUrl = (pageNumber, pageSize, email) =>
  `/Reservations?pageNumber=${pageNumber}&pageSize=${
    pageSize || ''
  }&email=${email}`;

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

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(allUsersUrl)
      .then((response) => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });
};

const getAllHotelsNameAndId = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(allHotelsUrl)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const getHotels = ({
  pageNumber,
  pageSize,
  dateIn,
  dateOut,
  manager,
  name,
  city,
  services,
  minDeposit,
  maxDeposit,
  minFloors,
  maxFloors,
}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        hotelsUrl({
          pageNumber,
          pageSize,
          dateIn,
          dateOut,
          manager,
          name,
          city,
          services,
          minDeposit,
          maxDeposit,
          minFloors,
          maxFloors,
        })
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getUsers = (pageNumber, pageSize, email, firstName, lastName) => {
  return new Promise((resolve, reject) => {
    axios
      .get(usersUrl(pageNumber, pageSize, email, firstName, lastName))
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const getRooms = (searchOptions) => {
  return new Promise((resolve, reject) => {
    axios
      .get(roomsUrl(searchOptions))
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const getReservations = (pageNumber, pageSize, email) => {
  return new Promise((resolve, reject) => {
    axios
      .get(reservationsUrl(pageNumber, pageSize, email))
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getRoomViews = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(roomViewUrl(''))
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
    console.log(room);
    axios
      .post(roomUrl(''), room)
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const getRoom = (roomId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(roomUrl(roomId))
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

const updateRoom = (room) => {
  console.log(room);
  return new Promise((resolve, reject) => {
    axios
      .put(roomUrl(room.id), room)
      .then((response) => resolve(response.data))
      .catch((error) => {
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
        reject(error);
      });
  });
};

const lockRoom = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(roomLockUrl(id))
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

const unlockRoom = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(roomUnlockUrl(id))
      .then(() => resolve())
      .catch((error) => reject(error));
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

const createUser = (user) => {
  return new Promise((resolve, reject) => {
    axios
      .post(userUrl(''), user)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getUser = (userId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(userUrl(userId))
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
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
        reject(error);
      });
  });
};

const deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(userUrl(userId))
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

const createHotelImage = (image) => {
  return new Promise((resolve, reject) => {
    axios
      .post(hotelImageUrl(''), image)
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.log(error.response);
        reject(error);
      });
  });
};

const deleteHotelImage = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(hotelImageUrl(id))
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const createRoomImage = (image) => {
  return new Promise((resolve, reject) => {
    axios
      .post(roomImageUrl(''), image)
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.log(error.response);
        reject(error);
      });
  });
};

const deleteRoomImage = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(roomImageUrl(id))
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
        reject(error);
      });
  });
};

const getReservation = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(reservationUrl(id))
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const createRoomView = (roomView) => {
  return new Promise((resolve, reject) => {
    axios
      .post(roomViewUrl(''), roomView)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const updateRoomView = (roomView) => {
  return new Promise((resolve, reject) => {
    axios
      .put(roomViewUrl(roomView.id), roomView)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const deleteRoomView = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(roomViewUrl(id))
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const getRoomNames = (hotelId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(roomNamesUrl(hotelId))
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const getRoomNumbers = (hotelId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(roomNumbersUrl(hotelId))
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export default {
  axios,
  getAllUsers,
  getAllHotelsNameAndId,
  getUsers,
  getHotels,
  getRooms,
  getRoomViews,
  deleteHotel,
  updateHotel,
  createHotel,
  getHotel,
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
  createService,
  updateService,
  deleteService,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  createHotelImage,
  deleteHotelImage,
  createRoomImage,
  deleteRoomImage,
  createReservation,
  getReservations,
  getReservation,
  createRoomView,
  updateRoomView,
  deleteRoomView,
  lockRoom,
  unlockRoom,
  getRoomNames,
  getRoomNumbers,
};
