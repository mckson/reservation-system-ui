import QueryString from 'qs';
import API from './API';

const roomUrl = (id) => `/Rooms${id ? `/${id}` : ''}`;
const roomLockUrl = (id) => `${this.roomUrl(id)}/lock`;
const roomUnlockUrl = (id) => `${this.roomUrl(id)}/unlock`;

// all unique room names
const roomNamesUrl = (hotelId) => `/Rooms/Names${hotelId ? `/${hotelId}` : ''}`;

// all unique room numbers
const roomNumbersUrl = (hotelId) =>
  `/Rooms/Numbers${hotelId ? `/${hotelId}` : ''}`;

const getRooms = ({
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
}) => {
  return new Promise((resolve, reject) => {
    API.axios
      .get(roomUrl(), {
        params: {
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
        },
        paramsSerializer: (params) =>
          QueryString.stringify(params, { arrayFormat: 'repeat' }),
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const getRoomNames = (hotelId) => {
  return new Promise((resolve, reject) => {
    API.axios
      .get(roomNamesUrl(hotelId))
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const getRoomNumbers = (hotelId) => {
  return new Promise((resolve, reject) => {
    API.axios
      .get(roomNumbersUrl(hotelId))
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const createRoom = (room) => {
  return new Promise((resolve, reject) => {
    console.log(room);
    API.axios
      .post(roomUrl(), room)
      .then((response) => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });
};

const getRoom = (roomId) => {
  return new Promise((resolve, reject) => {
    API.axios
      .get(roomUrl(roomId))
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

const updateRoom = (room) => {
  return new Promise((resolve, reject) => {
    API.axios
      .put(roomUrl(room.id), room)
      .then((response) => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteRoom = (id) => {
  return new Promise((resolve, reject) => {
    API.axios
      .delete(roomUrl(id))
      .then((response) => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });
};

const lockRoom = (id) => {
  return new Promise((resolve, reject) => {
    API.axios
      .post(roomLockUrl(id))
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

const unlockRoom = (id) => {
  return new Promise((resolve, reject) => {
    API.axios
      .post(roomUnlockUrl(id))
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

export default {
  getRooms,
  getRoomNames,
  getRoomNumbers,
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
  lockRoom,
  unlockRoom,
};
