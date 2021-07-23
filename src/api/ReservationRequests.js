import QueryString from 'qs';
import API from './API';

const reservationUrl = (id) => `/Reservations${id ? `/${id}` : ''}`;

const getReservations = ({ pageNumber, pageSize, email }) => {
  return new Promise((resolve, reject) => {
    API.axios
      .get(reservationUrl(), {
        params: {
          pageNumber,
          pageSize,
          email,
        },
        paramsSerializer: (params) =>
          QueryString.stringify(params, { arrayFormat: 'repeat' }),
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const createReservation = (reservation) => {
  return new Promise((resolve, reject) => {
    API.axios
      .post(reservationUrl(), reservation)
      .then((response) => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });
};

const getReservation = (id) => {
  return new Promise((resolve, reject) => {
    API.axios
      .get(reservationUrl(id))
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export default { getReservations, createReservation, getReservation };
