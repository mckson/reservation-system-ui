import API from './API';

const serviceUrl = (id) => `/Services${id ? `/${id}` : ''}`;
const serviceSearchVariantsUrl = '/Services/Search';

class ServiceFilter {
  constructor({
    pageNumber,
    pageSize,
    hotelId,
    name,
    propertyName,
    isDescending,
  }) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.hotelId = hotelId;
    this.name = name;
    this.propertyName = propertyName;
    this.isDescending = isDescending;
  }
}

const getServices = (filterObject) => {
  const filter = new ServiceFilter(filterObject);
  return new Promise((resolve, reject) => {
    API.axios
      .get(serviceUrl(), { params: filter })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const getServiceSearchVariants = (filterObject) => {
  const filter = new ServiceFilter(filterObject);
  return new Promise((resolve, reject) => {
    API.axios
      .get(serviceSearchVariantsUrl, { params: filter })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const createService = (service) => {
  return new Promise((resolve, reject) => {
    API.axios
      .post(serviceUrl(), service)
      .then((response) => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });
};

const updateService = (service) => {
  return new Promise((resolve, reject) => {
    API.axios
      .put(serviceUrl(service.id), service)
      .then((response) => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteService = (id) => {
  return new Promise((resolve, reject) => {
    API.axios
      .delete(serviceUrl(id))
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export default {
  getServices,
  getServiceSearchVariants,
  createService,
  updateService,
  deleteService,
};
