import API from './API';

const hotelImageUrl = (id) => `/Images/Hotel${id ? `/${id}` : ''}`;
const roomImageUrl = (id) => `/Images/Room${id ? `/${id}` : ''}`;

const createHotelImage = (image) => {
  return new Promise((resolve, reject) => {
    API.axios
      .post(hotelImageUrl(), image)
      .then((response) => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteHotelImage = (id) => {
  return new Promise((resolve, reject) => {
    API.axios
      .delete(hotelImageUrl(id))
      .then((response) => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });
};

const createRoomImage = (image) => {
  return new Promise((resolve, reject) => {
    API.axios
      .post(roomImageUrl(), image)
      .then((response) => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteRoomImage = (id) => {
  return new Promise((resolve, reject) => {
    API.axios
      .delete(roomImageUrl(id))
      .then((response) => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });
};

export default {
  createHotelImage,
  deleteHotelImage,
  createRoomImage,
  deleteRoomImage,
};
