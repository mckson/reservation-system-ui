import API from './API';

const roomViewUrl = (id) => `/RoomViews${id ? `/${id}` : ''}`;
const roomViewSearchUrl = '/RoomViews/Search';

class RoomViewFilter {
  constructor({ pageNumber, pageSize, name, propertyName, isDescending }) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;

    this.name = name;

    this.propertyName = propertyName;
    this.isDescending = isDescending;
  }
}
const getRoomViews = (filterObject) => {
  const filter = new RoomViewFilter(filterObject);
  return new Promise((resolve, reject) => {
    API.axios
      .get(roomViewUrl(), { params: filter })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const getRoomViewSearchPrompts = (filterObject) => {
  const filter = new RoomViewFilter(filterObject);
  return new Promise((resolve, reject) => {
    API.axios
      .get(roomViewSearchUrl, { params: filter })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const createRoomView = (roomView) => {
  return new Promise((resolve, reject) => {
    API.axios
      .post(roomViewUrl(), roomView)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const updateRoomView = (roomView) => {
  return new Promise((resolve, reject) => {
    API.axiosaxios
      .put(roomViewUrl(roomView.id), roomView)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const deleteRoomView = (id) => {
  return new Promise((resolve, reject) => {
    API.axios
      .delete(roomViewUrl(id))
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export default {
  getRoomViews,
  getRoomViewSearchPrompts,
  createRoomView,
  updateRoomView,
  deleteRoomView,
};
