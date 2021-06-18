import API from './API';

// const ManagementServiceException = (message) => ({
//   message,
// });

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
      // if (!returnedValue) {
      //   throw new ManagementServiceException('Unable to execute operation');
      // }

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

  const handleUpdateUser = async (updatedUser) => {
    const returnedUser = await API.updateUser(updatedUser);
    return returnedUser;

    // if (returnedUser != null) {
    //   await requestUsers();
    //   await requestHotels();
    // }
  };

  const handleCreateImage = async (image) => {
    const returnedImage = await API.createImage(image);
    return returnedImage;

    // if (returnedImage != null) {
    //   await requestHotels(searchParameters);
    // }
  };

  const handleDeleteImage = async (imageId) => {
    const returnedImage = await API.deleteImage(imageId);
    // eslint-disable-next-line no-debugger
    debugger;
    return returnedImage;
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
    handleUpdateUser,
    handleCreateImage,
    handleDeleteImage,
  };
})();

export default ManagementService;
