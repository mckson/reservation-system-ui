import QueryString from 'qs';
import API from './API';

const userUrl = (id) => `/Users${id ? `/${id}` : ''}`;

// brief user responses (for example, for search)
const allUsersUrl = '/Users/All';

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    API.axios
      .get(allUsersUrl)
      .then((response) => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });
};

const getUsers = ({
  pageNumber,
  pageSize,
  email,
  firstName,
  lastName,
  roles,
}) => {
  return new Promise((resolve, reject) => {
    API.axios
      .get(userUrl(), {
        params: {
          pageNumber,
          pageSize,
          email,
          firstName,
          lastName,
          roles,
        },
        paramsSerializer: (params) =>
          QueryString.stringify(params, { arrayFormat: 'repeat' }),
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

const createUser = (user) => {
  return new Promise((resolve, reject) => {
    API.axios
      .post(userUrl(), user)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getUser = (userId) => {
  return new Promise((resolve, reject) => {
    API.axios
      .get(userUrl(userId))
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

const updateUser = (user) => {
  return new Promise((resolve, reject) => {
    API.axios
      .put(userUrl(user.id), user)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    API.axios
      .delete(userUrl(userId))
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export default {
  getAllUsers,
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
