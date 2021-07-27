import QueryString from 'qs';
import API from './API';

const hotelUrl = (id) => `/Hotels${id ? `/${id}` : ''}`;

// brief hotel responses (for example, for search)
const allHotelsUrl = '/Hotels/All';

// brief hotel responses (for example, for search)
const hotelSearchUrl = '/Hotels/Search';

class HotelFilter {
  constructor({
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
  }) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.dateIn = dateIn;
    this.dateOut = dateOut;
    this.manager = manager;
    this.name = name;
    this.city = city;
    this.services = services;
    this.minDeposit = minDeposit;
    this.maxDeposit = maxDeposit;
    this.minFloors = minFloors;
    this.maxFloors = maxFloors;
  }
}

const getHotels = (filterObj) => {
  const filter = new HotelFilter(filterObj);
  return new Promise((resolve, reject) => {
    API.axios
      .get(hotelUrl(), {
        params: filter,
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

const getHotelSearchPrompts = (filterObj) => {
  const filter = new HotelFilter(filterObj);
  return new Promise((resolve, reject) => {
    API.axios
      .get(hotelSearchUrl, {
        params: filter,
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

const getAllBriefHotels = () => {
  return new Promise((resolve, reject) => {
    API.axios
      .get(allHotelsUrl)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const createHotel = (hotel) => {
  return new Promise((resolve, reject) => {
    API.axios
      .post(hotelUrl(), hotel)
      .then((response) => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });
};

const getHotel = (id) => {
  return new Promise((resolve, reject) => {
    API.axios
      .get(hotelUrl(id))
      .then((response) => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });
};

const updateHotel = (hotel) => {
  return new Promise((resolve, reject) => {
    API.axios
      .put(hotelUrl(hotel.id), hotel)
      .then((response) => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteHotel = (id) => {
  return new Promise((resolve, reject) => {
    API.axios
      .delete(hotelUrl(id))
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.log(error.response);
        reject(error);
      });
  });
};

export default {
  getHotels,
  getHotelSearchPrompts,
  getAllBriefHotels,
  createHotel,
  getHotel,
  updateHotel,
  deleteHotel,
};
