import API from './API';

const ManagementService = (function Management() {
  let service;
  function getService() {
    if (!service) {
      service = this;
    }

    return service;
  }

  const baseRequestHandler = async (requestFunction, parameter) => {
    try {
      const returnedValue = await requestFunction(parameter);

      return [returnedValue, null];
    } catch (error) {
      if (error.response.data.message) {
        return [null, error.response.data.message];
      }
      if (error.response.data.title) {
        return [null, error.response.data.title];
      }
      return [null, error.message];
    }
  };

  const handleCreateHotel = async (createdHotel) => {
    const returnedHotel = await API.createHotel(createdHotel);
    return returnedHotel;
  };

  const handleUpdateHotel = async (updatedHotel) => {
    const returnedHotel = await API.updateHotel(updatedHotel);
    return returnedHotel;
  };

  const handleDeleteHotel = async (id) => {
    const deletedHotel = await API.deleteHotel(id);
    return deletedHotel;
  };

  const handleCreateRoom = async (createdRoom) => {
    const returnedRoom = await API.createRoom(createdRoom);
    return returnedRoom;
  };

  const handleUpdateRoom = async (updatedRoom) => {
    const returnedRoom = await API.updateRoom(updatedRoom);
    return returnedRoom;
  };

  const handleDeleteRoom = async (id) => {
    const returnedRoom = await API.deleteRoom(id);
    return returnedRoom;
  };

  // returns error message
  const handleCreateService = async (createdService) => {
    const returnedService = await API.createService(createdService);
    return returnedService;
  };

  const handleUpdateService = async (updatedService) => {
    const returnedService = await API.updateService(updatedService);
    return returnedService;
  };

  const handleDeleteService = async (id) => {
    const returnedService = await API.deleteService(id);
    return returnedService;
  };

  const handleCreateUser = async (createdUser) => {
    const returnedUser = await API.createUser(createdUser);
    return returnedUser;
  };

  const handleUpdateUser = async (updatedUser) => {
    const returnedUser = await API.updateUser(updatedUser);
    return returnedUser;
  };

  const handleDeleteUser = async (id) => {
    const returnedUser = await API.deleteUser(id);
    return returnedUser;
  };

  const handleCreateHotelImage = async (image) => {
    try {
      await API.createHotelImage(image);
      return null;
    } catch (error) {
      if (error.response.data.message) {
        return error.response.data.message;
      }
      if (error.response.data.title) {
        return error.response.data.title;
      }
      return error.message;
    }
  };

  const handleDeleteHotelImage = async (imageId) => {
    try {
      await API.deleteHotelImage(imageId);
      return null;
    } catch (error) {
      if (error.response.data.message) {
        return error.response.data.message;
      }
      if (error.response.data.title) {
        return error.response.data.title;
      }
      return error.message;
    }
  };

  const handleCreateRoomImage = async (image) => {
    try {
      await API.createRoomImage(image);
      return null;
    } catch (error) {
      if (error.response.data.message) {
        return error.response.data.message;
      }
      if (error.response.data.title) {
        return error.response.data.title;
      }
      return error.message;
    }
  };

  const handleDeleteRoomImage = async (imageId) => {
    try {
      await API.deleteRoomImage(imageId);
      return null;
    } catch (error) {
      if (error.response.data.message) {
        return error.response.data.message;
      }
      if (error.response.data.title) {
        return error.response.data.title;
      }
      return error.message;
    }
  };

  const handleCreateRoomView = async (createdRoomView) => {
    const returnedRoomView = await API.createRoomView(createdRoomView);
    return returnedRoomView;
  };

  const handleUpdateRoomView = async (updatedRoomView) => {
    const returnedRoomView = await API.updateRoomView(updatedRoomView);
    return returnedRoomView;
  };

  const handleDeleteRoomView = async (id) => {
    const returnedRoomView = await API.deleteRoomView(id);
    return returnedRoomView;
  };

  return {
    getService,
    baseRequestHandler,
    handleCreateHotel,
    handleUpdateHotel,
    handleDeleteHotel,
    handleCreateRoom,
    handleUpdateRoom,
    handleDeleteRoom,
    handleCreateService,
    handleUpdateService,
    handleDeleteService,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    handleCreateHotelImage,
    handleDeleteHotelImage,
    handleCreateRoomImage,
    handleDeleteRoomImage,
    handleCreateRoomView,
    handleUpdateRoomView,
    handleDeleteRoomView,
  };
})();

export default ManagementService;
