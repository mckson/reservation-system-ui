import QueryString from 'qs';
import API from './API';

const roomUrl = (id) => `/Rooms${id ? `/${id}` : ''}`;
const roomLockUrl = (id) => `${this.roomUrl(id)}/lock`;
const roomUnlockUrl = (id) => `${this.roomUrl(id)}/unlock`;

const roomSearchVariantsUrl = '/Rooms/Search';

class RoomFilter {
  constructor({
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
    propertyName,
    isDescending,
  }) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.hotelId = hotelId;
    this.dateIn = dateIn;
    this.dateOut = dateOut;
    this.name = name;
    this.number = number;
    this.minFloorNumber = minFloorNumber;
    this.maxFloorNumber = maxFloorNumber;
    this.minCapacity = minCapacity;
    this.maxCapacity = maxCapacity;
    this.minArea = minArea;
    this.maxArea = maxArea;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.smoking = smoking;
    this.parking = parking;
    this.facilities = facilities;
    this.roomViews = roomViews;
    this.propertyName = propertyName;
    this.isDescending = isDescending;
  }
}

const getRooms = (filterObj) => {
  const filter = new RoomFilter(filterObj);
  return new Promise((resolve, reject) => {
    API.axios
      .get(roomUrl(), {
        params: filter,
        paramsSerializer: (params) =>
          QueryString.stringify(params, { arrayFormat: 'repeat' }),
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const getRoomSearchVariants = (filterObj) => {
  const filter = new RoomFilter(filterObj);
  return new Promise((resolve, reject) => {
    API.axios
      .get(roomSearchVariantsUrl, {
        params: filter,
        paramsSerializer: (params) =>
          QueryString.stringify(params, { arrayFormat: 'repeat' }),
      })
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
  getRoomSearchVariants,
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
  lockRoom,
  unlockRoom,
};
