import API from './API';

const roomViewUrl = (id) => `/RoomViews${id ? `/${id}` : ''}`;

const getRoomViews = ({ pageNumber, pageSize, name }) => {
  return new Promise((resolve, reject) => {
    API.axios
      .get(roomViewUrl(), { params: { pageNumber, pageSize, name } })
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

export default { getRoomViews, createRoomView, updateRoomView, deleteRoomView };
