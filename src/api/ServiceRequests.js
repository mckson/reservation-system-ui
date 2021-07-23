import API from './API';

const serviceUrl = (id) => `/Services${id ? `/${id}` : ''}`;

const getServices = ({ pageNumber, pageSize, hotelId }) => {
  return new Promise((resolve, reject) => {
    API.axios
      .get(serviceUrl(), { params: { pageNumber, pageSize, hotelId } })
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

export default { getServices, createService, updateService, deleteService };
