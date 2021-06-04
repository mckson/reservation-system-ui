import axios from 'axios';

const hotelsUrl = (pageNumber, pageSize, name, city, services) =>
  `/Hotels?pageNumber=${pageNumber}&PageSize=${pageSize}&name=${name}&city=${city}${services
    .map((service) => `&services=${service}`)
    .join('')}`;

const hotelUrl = (id) => `/Hotels/${id}`;

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
    // eslint-disable-next-line no-debugger
    debugger;
    axiosInstance
      .delete(hotelUrl(id), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((response) => resolve(response.data))
      .catch((error) => {
        // eslint-disable-next-line no-debugger
        debugger;
        reject(error);
      });
  });
};

export default { axiosInstance, getHotels, deleteHotel };
